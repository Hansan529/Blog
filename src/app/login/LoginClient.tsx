'use client';

import styles from './LoginClient.module.scss';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/feature/auth-slice';
import { api, formApi } from '../../axios';

type ChangInput = React.ChangeEvent<HTMLInputElement>;

const LoginClient = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const onChange = (e: ChangInput) => {
    const { name, value } = e.target;
    switch (name) {
      case 'id':
        setId(value);
        break;
      case 'pw':
        setPw(value);
      default:
        break;
    }
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('pw', pw);
    const {
      data: { login },
    } = await formApi.post(`/user/login`, formData);
    if (!login) {
      return;
    }
    dispatch(logIn(id));
    router.push('/');
  };

  // 토큰을 얻기 위해 홈페이지 이동
  const authGithub = async () => {
    const { data } = await api.get('/user/oauth');
    router.push(data);
  };
  return (
    <>
      <form method="POST" onSubmit={onSubmit} className={styles.form}>
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
        <button type="submit">로그인</button>
      </form>
      <button className={styles.githubLogin} onClick={authGithub} type="button">
        깃허브 로그인 &rarr;
      </button>
    </>
  );
};

export default LoginClient;
