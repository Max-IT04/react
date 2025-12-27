import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './App.module.css';

const sendData = (formData) => {
  console.log('Отправка данных:', formData);
};

const schema = yup.object({
  email: yup
    .string()
    .required('Email обязателен')
    .email('Неверный email. Допустимый формат: user@mail.com')
    .min(5, 'Неверный email. Должно быть не меньше 5 символов')
    .max(254, 'Неверный email. Должно быть не больше 254 символов'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(8, 'Пароль должен быть минимум 8 символов')
    .matches(/[A-Z]/, 'Добавьте хотя бы одну заглавную букву')
    .matches(/\d/, 'Добавьте хотя бы одну цифру'),
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
}).required();

function App() {
  const buttonRef = useRef(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    watch,
    trigger
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  useEffect(() => {
    if (isValid) {
      buttonRef.current?.focus();
    }
  }, [isValid]);

  const onEmailBlur = () => {
    trigger('email');
  };

  const onPasswordBlur = () => {
    trigger(['password', 'confirmPassword']);
  };

  const onConfirmPasswordBlur = () => {
    trigger('confirmPassword');
  };

  const onSubmit = (data) => {
    sendData(data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className={styles.app}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          type="email" 
          placeholder="Почта" 
          {...register('email', {
            onBlur: onEmailBlur
          })}
        />
        {errors.email && <div className={styles.errorLabel}>{errors.email.message}</div>}
        
        <input 
          type="password" 
          placeholder="Пароль" 
          {...register('password', {
            onBlur: onPasswordBlur
          })}
        />
        {errors.password && <div className={styles.errorLabel}>{errors.password.message}</div>}
        
        <input 
          type="password" 
          placeholder="Повторите пароль" 
          {...register('confirmPassword', {
            onBlur: onConfirmPasswordBlur
          })}
        />
        {errors.confirmPassword && <div className={styles.errorLabel}>{errors.confirmPassword.message}</div>}
        
        <button type="button" onClick={handleReset}>Сброс</button>
        <button 
          type="submit" 
          ref={buttonRef} 
          disabled={!isValid || isSubmitting}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default App;