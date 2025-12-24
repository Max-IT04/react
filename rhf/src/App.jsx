import { useRef, useEffect } from 'react';
import {useForm } from 'react-hook-form';
import styles from './App.module.css';

const sendData = (formData) => {
  console.log('Отправка данных:', formData);
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '', 
      confirmPassword: ''
    },
  });

  const onSubmit = (data) => {
    sendData(data);
  };

  const buttonRef = useRef(null);

  useEffect(() => {
    if (isValid) {
      buttonRef.current?.focus();
    }
  }, [isValid]);

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div>
          <input
            type="email"
            placeholder="Почта"
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Неверный email. Допустимый формат: user@mail.com'
              },
              maxLength: {
                value: 254,
                message: 'Неверный email. Должно быть не больше 254 символов'
              }
            })}
          />
          {errors.email && <div className={styles.errorLabel}>{errors.email.message}</div>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Пароль"
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: {
                value: 8,
                message: 'Пароль должен быть минимум 8 символов'
              },
              pattern: {
                value: /[A-Z]/,
                message: 'Добавьте хотя бы одну заглавную букву'
              },
              validate: (value) => /\d/.test(value) || 'Добавьте хотя бы одну цифру'
            })}
          />
          {errors.password && <div className={styles.errorLabel}>{errors.password.message}</div>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Повторите пароль"
            {...register('confirmPassword', {
              required: 'Подтвердите пароль',
              validate: (value) => {
                const passwordValue = getValues('password');
                return value === passwordValue || 'Пароли не совпадают';
              }
            })}
          />
          {errors.confirmPassword && (
            <div className={styles.errorLabel}>{errors.confirmPassword.message}</div>
          )}
        </div>

        <button ref={buttonRef} type="submit" disabled={!isValid}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default App;

