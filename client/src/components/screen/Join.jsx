// Components
import Header from "../partials/Header";
import Footer from "../partials/Footer";

// Function
import styles from "../../styles/screen/css/Join.module.css";
import errorStyles from "../../styles/config/css/statusStyle.module.css";
import { server } from "./Home";

// Package
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

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
  const social = useSelector((state) => state.info.socialLogin);
  const navigate = useNavigate();

  // * 소셜 로그인으로 접근할 경우, DB 생성 요청
  const socialJoin = async () => {
    // LoginCallback 컴포넌트에서 넘어옴, 해당 값들을 추출한 뒤, JSON으로 만들어서 서버에 요청함
    const { socialLogin, avatarImg, username, email } = social;
    const data = {
      socialLogin,
      avatarImg,
      username,
      email,
    };
    const { status } = await server.post("/join", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    /**
     * 상태코드가 201일경우 홈 루트로 이동
     */
    if (status === 201) {
      navigate("/");
    } else {
      setError(true);
    }
  };

  // * 관리자 추가 요청
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
    const response = await server.post(`/join`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // 에러가 발생할 경우 에러 띄우기
    if (response.data.error) {
      setError(true);
      return;
    }
    navigate("/");
  };

  // * Input 요소 State에 저장
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

  // * 관리자 비밀번호가 일치하는지 체크
  const authLogin = (e) => {
    e.preventDefault();
    if (authPassword === process.env.REACT_APP_ADMIN_PW) {
      setAuth(true);
      if (social) {
        socialJoin();
      }
    }
  };

  // * 에러가 변할 경우 3초 뒤 원복하도록 설정
  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  return (
    <>
      <Header />
      {auth ? (
        <main>
          <article>
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
              <div className={errorStyles.error}>
                <h2>중복된 아이디가 있습니다.</h2>
              </div>
            ) : null}
          </article>
        </main>
      ) : (
        <main>
          <article>
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
          </article>
        </main>
      )}
      <Footer />
    </>
  );
}

export default Join;
