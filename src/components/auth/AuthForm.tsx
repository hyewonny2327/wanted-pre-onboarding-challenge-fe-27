//email과 password를 input으로 받아 유효성을 검사하고, 제출하는 컴포넌트
import { FieldError, FieldValues, useForm } from 'react-hook-form';
import styles from '../../styles/auth.module.scss';
interface AuthFormProps {
  onSubmit: (data: FieldValues) => void;
  submitText: string;
}
function AuthForm({ onSubmit, submitText }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form__container}>
      <label htmlFor="email" className={styles.form__label}>
        Email
      </label>
      <input
        className={styles.form__input}
        placeholder="이메일을 입력하세요"
        {...register('email', {
          required: '이메일을 입력하세요.',
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, // 이메일 형식 검사
            message: '올바른 이메일 형식이 아닙니다.',
          },
        })}
      />
      {errors.email && <p style={{ color: 'red' }}>{(errors.email as FieldError)?.message}</p>}
      <label htmlFor="password" className={styles.form__label}>
        PW
      </label>
      <input
        className={styles.form__input}
        placeholder="8자리 이상의 비밀번호를 입력하세요"
        {...register('password', {
          required: '비밀번호를 입력하세요',
          minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야합니다.',
          },
        })}
      />
      {errors.password && <p style={{ color: 'red' }}>{(errors.password as FieldError)?.message}</p>}
      <input type="submit" disabled={!isValid} value={submitText} className={styles.form__submit} />
    </form>
  );
}

export default AuthForm;
