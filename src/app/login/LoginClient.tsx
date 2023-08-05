'use client';

import { useState } from 'react';
import styles from './LoginClient.module.scss';

type ChangInput = React.ChangeEvent<HTMLInputElement>;

export default function LoginClient() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
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
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const authGithub = () => {};
  return (
    <>
      <form method="POST" className={styles.form} onSubmit={onSubmit}>
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
}
