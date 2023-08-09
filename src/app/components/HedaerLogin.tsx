'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logOut } from '../redux/feature/auth-slice';
import Link from 'next/link';

const HeaderLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginChk = useSelector((state: RootState) => state.auth.value.isAuth);
  return (
    <div style={{ display: 'flex', gap: '30px' }}>
      {loginChk ? (
        <>
          <Link href="/portfolio-setting">설정</Link>
          <button onClick={() => dispatch(logOut())}>로그아웃</button>
        </>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </div>
  );
};

export default HeaderLogin;
