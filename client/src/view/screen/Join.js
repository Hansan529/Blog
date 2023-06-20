import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
  const onSubmit = (e) => {
    setTryJoin(true);
    e.preventDefault();
    if (pw !== pw2) {
      setPwChk(false);
      return;
    }
    setPwChk(true);
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
        setEmailLast(`${emailFirst}@${value}`);
        setTypingEmailInput(value);
        setSelected(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header />
      <main>
        <h2>관리자 추가</h2>
        {tryJoin ? (
          pwChk ? null : (
            <small>비밀번호가 일치하지 않습니다</small>
          )
        ) : null}
        <form method="POST" action="/api/login" className={styles.form}>
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
                <select name="email_last" value={selected} onChange={onChange}>
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
      </main>
      <Footer />
    </>
  );
}

export default Join;
