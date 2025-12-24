import { useState, useRef, useEffect } from 'react';
import * as yup from 'yup';
import styles from './App.module.css';
import { useStore } from './hooks/useStore';

const scheme = yup.object({
  email: yup.string().email('Некорректный email').required('Обязательно'),
  password: yup.string().min(8, 'Минимум 8 символов').required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required(),
}); 

function App() {
  const { getState, updateState } = useStore();
  const [ errors, setErrors ] = useState({}); 

  const buttonRef = useRef(null); 

  const { email, password, confirmPassword } = getState();

  const isFormValid = Object.values(errors).every(error => !error);

  useEffect(() => {
    if (isFormValid) {
      buttonRef.current?.focus();
    }
  }, [isFormValid]);

  const handleChange = async (field, value) => {
    updateState(field, value); 

    try {
      await scheme.validateAt(field, { [field]: value }); 
      setErrors(prev => ({ ...prev, [field]: '' }));
    } catch (error) {
      setErrors(prev => ({ ...prev, [field]: error.message })); 
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await scheme.validate(getState(), { abortEarly: false });
      console.log('Отправка данных:', getState());
      setErrors({});
    } catch (error) {
      const newErrors = {};
      error.inner.forEach(err => {
        newErrors[err.path] = err.message; 
      }); 
      setErrors(newErrors); 
    }
  };

  return (
    <div className={styles.app}>
      <form onSubmit={onSubmit}>
        <input 
          value={email} 
          placeholder="Почта" 
          onChange={(e) => handleChange('email', e.target.value)}
        />
        {errors.email && <div className={styles.errorLabel}>{errors.email}</div>}
        <input 
          value={password} 
          placeholder="Пароль" 
          onChange={(e) => handleChange('password', e.target.value)}
        />
        {errors.password && <div className={styles.errorLabel}>{errors.password}</div>}
        <input 
          value={confirmPassword} 
          placeholder="Повторите пароль" 
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
        />
        {errors.confirmPassword && <div className={styles.errorLabel}>{errors.confirmPassword}</div>}
        <button type="submit" ref={buttonRef} disabled={!isFormValid}>Зарегистрироваться</button>
      </form>
    </div>
  )
};

export default App;
