// Component 불러오기
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";


function Home() {
  const logged = useSelector((state) => state.login.value);
  return (
    <>
      <Header />
      <main>
      {logged ? (
        <div>
          로그인 완료
        </div>
      ) : null}
      </main>
      <Footer />
    </>
  );
}

export default Home;
