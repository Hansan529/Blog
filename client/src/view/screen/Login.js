// Component 불러오기
import Footer from "../components/Footer";
import Header from "../components/Header";

// CSS 모듈
import styles from "./Login.module.css";
import errorStyles from "../config/statusStyle.module.css";

// 패키지
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { check } from "../../reducer/loginSlice";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  // loginSlice의 기본 값 불러오기
  // const loginState = useSelector((state) => state.login.value);
  const dispatch = useDispatch();

  const onClick = async (e) => {
    e.preventDefault();
    // JSON 객체 생성
    const loginData = {
      id,
      pw,
    };
    // 로그인 시도
    const { success, error } = await (
      await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/login`,
        JSON.stringify(loginData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).data;
    /**
     * 로그인 성공 시 state를 true로 변경 후, 루트로 이동
     * 실패할 경우 에러 메시지 지정
     */
    if (success) {
        dispatch(check(true));
        window.location.href = "/";
        return;
    } else {
      setError(error);
    }
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    switch (true) {
      case name === "id":
        setId(value);
        break;
      case name === "pw":
        setPw(value);
        break;
      default:
        break;
    }
  };

  useEffect(()=>{
    if(error){
      setTimeout(()=>{
        // 에러 객체 (div) 제거
        setError("")
      },3000)
    }
  },[error])

  return (
    <>
      <Header />
      <main className={styles.main}>
        <h2>관리자 로그인</h2>
        <form
          method="POST"
          className={styles.form}
          action={`${process.env.REACT_APP_API_ENDPOINT}/login`}
        >
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
          <button type="submit" onClick={onClick}>
            로그인
          </button>
        </form>
        {error ? <div className={errorStyles.error}><h2>{error}</h2></div> : null}
      </main>
      <Footer />
    </>
  );
}
export default Login;
