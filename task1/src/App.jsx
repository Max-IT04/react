import { useState, useRef, useEffect } from 'react';
import styles from './App.module.css';
import { useStore } from './hooks/useStore';

const sendData = (formData) => {
  console.log('Отправка данных:', formData);
};

function App() {
  const { getState, updateState, resetState } = useStore();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null); 

  const buttonRef = useRef(null); 

  const isFormValid = !emailError && !passwordError && !confirmPasswordError;

  useEffect(() => {
    if (isFormValid) {
      buttonRef.current?.focus();
    }
  }, [isFormValid]); 

  const onEmailChange = ({ target }) => {
    const value = target.value;

    updateState('email', value);

    let newError = null; 

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target.value)) {
      newError = 'Неверный email. Допустимый формат: user@mail.com';
    } else if (target.value.length > 254) {
      newError = 'Неверный email. Должно быть не больше 254 символов';
    }

    setEmailError(newError);
  };

  const onEmailBlur = ({ target }) => {
    const value = target.value;

    if (value && value.length < 5) {
      setEmailError('Неверный email. Должно быть не меньше 5 символов');
    }
  }

    const onPasswordChange = ({ target }) => {
    const value = target.value;

    updateState('password', value);

    let newError = null;

    if (!value) {
      newError = 'Пароль обязателен'; 
    } else if (value.length < 8) {
      newError = 'Пароль должен быть минимум 8 символов';
    } else if (!/[A-Z]/.test(value)) {
      newError = 'Добавьте хотя бы одну заглавную букву';
    } else if (!/\d/.test(value)) {
      newError = 'Добавьте хотя бы одну цифру';
    }

    setPasswordError(newError);

    const { confirmPassword } = getState();
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError('Пароли не совпадают'); 
    } else if(confirmPassword && value === confirmPassword) {
      setConfirmPasswordError(null);
    }
  }; 

  const onConfirmPasswordChange = ({ target }) => {
    const value = target.value;

    updateState('confirmPassword', value);

    let newError = null;

    const { password } = getState(); 

    if (!value) {
      newError = 'Подтвердите пароль';
    } else if (password !== value) {
      newError = 'Пароли не совпадают'; 
    }

    setConfirmPasswordError(newError); 
  }

    const onPasswordBlur = ({ target }) => {
    const value = target.value;

    if (value && value.length < 8) {
      setPasswordError('Пароль должен содержать минимум 8 символов');
    }
  }; 

  const onConfirmPasswordBlur = ({ target }) => {
    const value = target.value; 
    const { password } = getState();

    if (value && password !== value) {
      setConfirmPasswordError('Пароли не совпадают');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }
    
    const { email, password, confirmPassword } = getState();

    let hasFinalErrors = false;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Неверный email. Допустимый формат: user@mail.com');
      hasFinalErrors = true;
    } 

    if (!password || password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      setPasswordError('Пароль должен быть минимум 8 символов, содержать заглавную букву и цифру');
      hasFinalErrors = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Пароли не совпадают');
      hasFinalErrors = true;
    }

    if (!hasFinalErrors) {
      sendData({ email, password, confirmPassword });
    }
  };

  const { email, password, confirmPassword } = getState();

  return (
    <div className={styles.app}>
      <form onSubmit={onSubmit}>
        <input 
          type="email" 
          name="email" 
          value={email} 
          placeholder="Почта" 
          onChange={onEmailChange}
          onBlur={onEmailBlur}
        />
        {emailError && <div className={styles.errorLabel}>{emailError}</div>}
        <input 
          type="password" 
          name="password" 
          value={password} 
          placeholder="Пароль" 
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
        />
        {passwordError && <div className={styles.errorLabel}>{passwordError}</div>}
        <input 
          type="password" 
          name="confirmPassword" 
          value={confirmPassword} 
          placeholder="Повторите пароль" 
          onChange={onConfirmPasswordChange}
          onBlur={onConfirmPasswordBlur}
        />
        {confirmPasswordError && <div className={styles.errorLabel}>{confirmPasswordError}</div>}
        <button onClick={resetState}>Сброс</button>
        <button type="submit" ref={buttonRef} disabled={!isFormValid}>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default App;

