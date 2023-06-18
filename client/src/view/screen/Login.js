import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./Login.module.css";

function Login() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <h2>관리자 로그인</h2>
        <form method="POST" className={styles.form} action="/api/login">
          <input type="text" name="id" placeholder="아이디" required />
          <input type="password" name="pw" placeholder="패스워드" required />
          <button type="submit">로그인</button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Login;
