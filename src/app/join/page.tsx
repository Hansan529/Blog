'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './page.modules.scss';
import { formApi } from '../../axios';
import { useDispatch } from 'react-redux';
import { logIn } from '../redux/feature/auth-slice';

type ChangeType = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
type SubmitForm = React.FormEvent<HTMLFormElement>;

export default function Join() {
  const [auth, setAuth] = useState<boolean>(false);
  const [authPassword, setAuthPasswrod] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [pw2, setPw2] = useState<string>('');
  const [emailFirst, setEmailFirst] = useState<string>('');
  const [emailLast, setEmailLast] = useState<string>('');
  const [selected, setSelected] = useState<string>('placeholder');
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const dispatch = useDispatch();

  //   Sign up 추가 접근
  const authLogin = (e: SubmitForm) => {
    e.preventDefault();
    if (authPassword === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setAuth(true);
    } else {
      router.push('/');
    }
  };

  const authChange = (e: ChangeType) => {
    setAuthPasswrod(e.target.value);
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pw !== pw2) {
      setError('비밀번호가 일치하지 않습니다');
      return;
    } else if (selected === 'placeholder') {
      setError('이메일을 선택해주세요');
      return;
    }
    setError('');
    const formData = new FormData();
    formData.append('id', id);
    formData.append('pw', pw);
    formData.append('pw2', pw2);
    formData.append('email', `${emailFirst}@${emailLast}`);
    const {
      data: { join },
    } = await formApi.post('/user/join', formData);
    if (join) {
      dispatch(logIn());
      router.push('/');
    } else {
      alert('관리자 추가 실패');
      return;
    }
  };

  const signUpChange = (e: ChangeType) => {
    const { name, value } = e.target;
    switch (name) {
      case 'id':
        setId(value);
        break;
      case 'pw':
        setPw(value);
        break;
      case 'pw2':
        setPw2(value);
        break;
      case 'email_first':
        setEmailFirst(value);
        break;
      case 'email_last':
        setEmailLast(value);
        setSelected(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {auth ? (
        <article>
          <h2>관리자 추가</h2>
          {error.match(/[비밀번호]/) ? <small>{error}</small> : null}
          <form method="POST" onSubmit={signUp} className="form">
            <label>
              <span>아이디: </span>
              <div>
                <input
                  type="text"
                  name="id"
                  placeholder="아이디"
                  value={id}
                  onChange={signUpChange}
                  required
                />
              </div>
            </label>
            <label>
              <span>비밀번호 / 재확인:</span>
              <div>
                <input
                  type="password"
                  name="pw"
                  placeholder="패스워드"
                  value={pw}
                  onChange={signUpChange}
                  required
                />
                <input
                  type="password"
                  name="pw2"
                  placeholder="패스워드 재입력"
                  value={pw2}
                  onChange={signUpChange}
                  required
                />
              </div>
              {error.match(/^비밀번호$/) ? (
                <div className="noMatch__pw">{error}</div>
              ) : null}
            </label>
            <label>
              <span>이메일: </span>
              <div>
                <input
                  type="text"
                  name="email_first"
                  placeholder="이메일 주소"
                  value={emailFirst}
                  onChange={signUpChange}
                  required
                />
                @
                <select
                  name="email_last"
                  value={selected}
                  onChange={signUpChange}
                >
                  <option value="placeholder" disabled>
                    이메일을 고르세요
                  </option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="icloud.com">icloud.com</option>
                </select>
                {error.match(/^이메일$/) ? (
                  <div className="noMatch_email">{error}</div>
                ) : null}
              </div>
            </label>
            <button className="submitBtn" type="submit">
              관리자 추가
            </button>
          </form>
          {/* {error ? (
            <div className={errorStyles.error}>
              <h2>중복된 아이디가 있습니다.</h2>
            </div>
          ) : null} */}
        </article>
      ) : (
        <article>
          <h2>관리자 페이지 접근</h2>
          <form onSubmit={authLogin}>
            <input
              type="password"
              name="authPassword"
              value={authPassword}
              onChange={authChange}
              placeholder="비밀번호"
            />
            <button type="submit">전송</button>
          </form>
        </article>
      )}
    </>
  );
}
