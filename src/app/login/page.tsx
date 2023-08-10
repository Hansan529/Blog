import { useSelector } from 'react-redux';
import { logIn } from '../redux/feature/auth-slice';
import { RootState } from '../redux/store';
import styles from './page.module.scss';
import LoginClient from './LoginClient';

// Component
const Login = () => {
  return (
    <article className={styles.screen}>
      <div className={styles.formWrap}>
        <h2>관리자 로그인</h2>
        <LoginClient />
      </div>
    </article>
  );
};

export default Login;
