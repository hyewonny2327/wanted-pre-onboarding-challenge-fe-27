import { FieldValues } from 'react-hook-form';
import { login, signUp } from '../../api/authApi';
import AuthForm from '../../components/auth/AuthForm';
import styles from '../../styles/auth.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isSignInActive, setIsSignInActive] = useState(true);
  const navigate = useNavigate();
  async function loginUser(email: string, password: string) {
    try {
      const res = await login(email, password);
      setUserInfo(res.data.token);
      navigate('/todo');
    } catch (error) {
      console.error(error);
    }
  }
  async function signUpUser(email: string, password: string) {
    try {
      const res = await signUp(email, password);
      setUserInfo(res.data.token);
      navigate('/todo');
    } catch (error) {
      console.error(error);
    }
  }

  function onSubmitLoginInfo(data: FieldValues) {
    loginUser(data.email, data.password);
  }
  function onSubmitSingUpInfo(data: FieldValues) {
    signUpUser(data.email, data.password);
  }
  function setUserInfo(token: string) {
    localStorage.setItem('authToken', token);
  }
  return (
    <div className={styles.container}>
      <section className={styles.authToggle}>
        <div
          className={`${styles.authToggle__toggleButton} ${isSignInActive ? styles.authToggle__active : ''}`}
          onClick={() => setIsSignInActive(true)}
        >
          SignIn
        </div>
        <div
          className={`${styles.authToggle__toggleButton} ${!isSignInActive ? styles.authToggle__active : ''}`}
          onClick={() => setIsSignInActive(false)}
        >
          SignUp
        </div>
      </section>
      {isSignInActive ? (
        <div>
          <AuthForm onSubmit={onSubmitLoginInfo} submitText="로그인하기"></AuthForm>
        </div>
      ) : (
        <div>
          <AuthForm onSubmit={onSubmitSingUpInfo} submitText="회원가입하기"></AuthForm>
        </div>
      )}
    </div>
  );
}
