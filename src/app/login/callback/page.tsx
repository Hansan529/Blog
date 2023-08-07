'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '../../../axios';
import { useEffect } from 'react';

export default async function Callback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const post = async () =>
    await api.post(`${process.env.NEXT_PUBLIC_API}/user/oauth`, { code });
  useEffect(() => {
    post();
    router.push('/');
  }, []);
  //   router.push('/');
  return <div>콜백</div>;
}
