import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./Login.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import axios from "axios";
// import { loginActions } from "../../reducer/loginSlice";
import { check } from "../../reducer/loginSlice";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
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
    const { login } = await (
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
     * 로그인 성공 시 true, 실패 시 false
     */
    if (login) {
      // loginSlice의 check 함수의 action에 payload 값을 추가한다.
      // dispatch(loginActions.check(true));
        dispatch(check(true));
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

  return (
    <>
      <Header />
      <main className={styles.main}>
        <h2>관리자 로그인</h2>
        {/* <p>{logged}</p> */}
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
      </main>
      <Footer />
    </>
  );
}
export default Login;
