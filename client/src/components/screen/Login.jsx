// Component 불러오기
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Loading from '../config/Loading';

// Function
import styles from '../../styles/screen/css/Login.module.css';
import errorStyles from '../../styles/config/css/statusStyle.module.css';
import { login } from '../../_redux/_reducer/InfoSlice';
import { server } from './Home';

// Package
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// *
function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const logged = useSelector((state) => state.info.logged);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = async (e) => {
    e.preventDefault();
    // JSON 객체 생성
    const loginData = {
      id,
      pw,
    };
    // 로그인 시도
    const { success, error } = await (
      await server.post('/login', JSON.stringify(loginData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).data;
    /**
     * 로그인 성공 시 state를 true로 변경 후, 루트로 이동
     * 실패할 경우 에러 메시지 지정
     */
    if (success) {
      dispatch(login(true));
      navigate('/');
      return;
    } else {
      setError(error);
    }
  };

  // 깃허브 로그인 함수
  const onClickGithub = async () => {
    setLoading(true);
    const data = await (await server.get('/login/github/token')).data;
    window.location.href = data;
    // 이 후 LoginCallback 컴포넌트에서 진행됨
  };

  // Input 값 저장
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    switch (true) {
      case name === 'id':
        setId(value);
        break;
      case name === 'pw':
        setPw(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        // 에러 객체 (div) 제거
        setError('');
      }, 3000);
    }
  }, [error]);

  // Login을 이미 했으면 접근할 수 없음
  useEffect(() => {
    if (logged) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <h2>관리자 로그인</h2>
            <form
              method="POST"
              className={styles.form}
              action={`${process.env.REACT_APP_API_ENDPOINT}/login`}
            >
              <input
                type="text"
                name="id"
                placeholder="아이디"
                required
                value={id}
                onChange={onChange}
              />
              <input
                type="password"
                name="pw"
                placeholder="패스워드"
                required
                value={pw}
                onChange={onChange}
              />
              <button type="submit" onClick={onClick}>
                로그인
              </button>
            </form>
            <button type="button" onClick={onClickGithub}>
              깃허브 로그인
            </button>
            {error ? (
              <div className={errorStyles.error}>
                <h2>{error}</h2>
              </div>
            ) : null}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
export default Login;
