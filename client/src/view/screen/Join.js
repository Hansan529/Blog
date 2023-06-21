import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import axios from "axios";
import styles from "./Join.module.css";

function Join() {
  const [pwChk, setPwChk] = useState("");
  const [tryJoin, setTryJoin] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [emailFirst, setEmailFirst] = useState("");
  const [emailLast, setEmailLast] = useState("");
  const [selected, setSelected] = useState("placeholder");
  const [typingEmail, setTypingEmail] = useState(false);
  const [typingEmailInput, setTypingEmailInput] = useState("");
  const [error, setError] = useState(false);
  const [auth, setAuth] = useState(false);
  const [authPassword, setAuthPassword] = useState("");

  const onSubmit = async (e) => {
    setTryJoin(true);
    e.preventDefault();
    if (pw !== pw2) {
      setPwChk(false);
      return;
    }
    setPwChk(true);
    const data = {
      id,
      pw,
      email: `${emailFirst}@${emailLast}`,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_JOIN_URL}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.error) {
      setError(true);
      const clear = setInterval(() => {
        setError(false);
        clearInterval(clear);
      }, 3000);
      return;
    }
    setId("");
    setPw("");
    setPw2("");
    setEmailFirst("");
    setEmailLast("");
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (value === "typingEmail") {
      setTypingEmail(true);
      return;
    }
    switch (true) {
      case name === "id":
        setId(value);
        break;
      case name === "pw":
        setPw(value);
        break;
      case name === "pw2":
        setPw2(value);
        break;
      case name === "email_first":
        setEmailFirst(value);
        break;
      case name === "email_last":
        setEmailLast(value);
        setTypingEmailInput(value);
        setSelected(value);
        break;
      case name === "authPassword":
        setAuthPassword(value);
        break;
      default:
        break;
    }
  };

  const authLogin = (e) => {
    e.preventDefault();
    if (authPassword === process.env.REACT_APP_ADMIN_PW) {
      setAuth(true);
    }
  };

  return (
    <>
      <Header />
      {auth ? (
        <main>
          <h2>관리자 추가</h2>
          {tryJoin ? (
            pwChk ? null : (
              <small>비밀번호가 일치하지 않습니다</small>
            )
          ) : null}
          <form metohd="POST" className={styles.form}>
            <label>
              <span>아이디: </span>
              <div>
                <input
                  type="text"
                  name="id"
                  placeholder="아이디"
                  value={id}
                  onChange={onChange}
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
                  onChange={onChange}
                  required
                />
                <input
                  type="password"
                  name="pw2"
                  placeholder="패스워드 재입력"
                  value={pw2}
                  onChange={onChange}
                  required
                />
              </div>
            </label>
            <label>
              <span>이메일: </span>
              <div>
                <input
                  type="text"
                  name="email_first"
                  placeholder="이메일 주소"
                  value={emailFirst}
                  onChange={onChange}
                  required
                />
                @
                {!typingEmail ? (
                  <select
                    name="email_last"
                    value={selected}
                    onChange={onChange}
                  >
                    <option value="placeholder" disabled>
                      이메일을 고르세요
                    </option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="naver.com">naver.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="icloud.com">icloud.com</option>
                    <option value="typingEmail">직접 입력하기</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    name="email_last"
                    value={typingEmailInput}
                    onChange={onChange}
                    placeholder="도메인 입력"
                    required
                  />
                )}
              </div>
            </label>
            <button type="submit" onClick={onSubmit}>
              관리자 추가
            </button>
          </form>
          {error ? (
            <div className={styles.error}>
              <h2>중복된 아이디가 있습니다.</h2>
            </div>
          ) : null}
        </main>
      ) : (
        <main>
          <h2>관리자 페이지 접근</h2>
          <form>
            <input
              type="password"
              name="authPassword"
              value={authPassword}
              onChange={onChange}
              placeholder="비밀번호"
            />
            <button onClick={authLogin}>전송</button>
          </form>
        </main>
      )}
      <Footer />
    </>
  );
}

export default Join;
