// Component
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Loading from './Loading';

// Function
import { server } from '../screen/Home';
import { login, socialLogin } from '../../_redux/_reducer/InfoSlice';

// Package
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginCallback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 현재 URL 정보 가져오기
  const location = useLocation();
  // 경로 생성 #1
  const params = new URLSearchParams(location.search);
  const obj = {};

  // 경로 생성 #2
  params.forEach((value, key) => {
    obj[key] = value;
  });

  const data = async () => {
    const data = await (await server.post('/login/github/access', obj)).data;
    if (data.logged) {
      // 소셜 로그인일 경우, 로그인 처리
      dispatch(login(data.logged));
      navigate('/');
    } else {
      // 소셜 로그인이 아닐 경우, 데이터를 갖고 회원가입 페이지로 이동
      dispatch(socialLogin(data));
      navigate('/join');
    }
  };

  useEffect(() => {
    data();
  }, [obj]);

  return (
    <>
      <Header />
      <Loading />
      <Footer />
    </>
  );
}

export default LoginCallback;
