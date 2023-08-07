'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '../../../axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/feature/auth-slice';

// Github Callback 주소로 GET 이동됨
export default async function Callback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const dispatch = useDispatch();

  // API 서버로 CODE를 전송
  const post = async () => {
    const res = await (
      await api.post(`${process.env.NEXT_PUBLIC_API}/user/oauth`, {
        code,
      })
    ).data;

    // 로그인 값이 true 일 경우 로그인처리
    if (res.login) {
      dispatch(logIn());
      router.push('/');
    } else {
      // 실패했을 경우 재로그인
      router.push('/login');
    }
  };

  // 콜백으로 인해 접근할 경우 API 요청 시도
  useEffect(() => {
    post();
  }, []);
  //   router.push('/');
  return <div>로딩 페이지</div>;
}
