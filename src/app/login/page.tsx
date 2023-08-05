import { useSelector } from 'react-redux';
import { logIn } from '../redux/feature/auth-slice';
import { RootState } from '../redux/store';
import './page.modules.scss';
import LoginClient from './LoginClient';

// Component
export default function Login() {
  return (
    <article className="screen">
      <div className="formWrap">
        <h2>관리자 로그인</h2>
        <LoginClient />
      </div>
      {/* {error ? (
        <div className={errorStyles.error}>
          <h2>{error}</h2>
        </div>
      ) : null} */}
    </article>
  );
}
