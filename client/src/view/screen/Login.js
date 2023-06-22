import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./Login.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import axios from "axios";

function Login() {
  const [id, setId] = useState("a");
  const [pw, setPw] = useState("b");
  const logged = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const onClick = async (e) => {
    e.preventDefault();
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
      dispatch({ type: "LOGIN", logged: "true" });
      console.log("logged", logged);
    }
    console.log("logged Check", logged);
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
        <p>{logged}</p>
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

// function mapStateToProps(state, ownProps) {
//   return {
//     text: "hey",
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;
