// Component 불러오기
import { useSelector } from 'react-redux';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

import ProjectUpload from './ProjectUpload';

function Home() {
  const logged = useSelector((state) => state.login.value);
  return (
    <>
      <Header />
      <main>
        {logged ? (
          <div>
            로그인 완료
            <ProjectUpload />
          </div>
        ) : null}
      </main>
      <Footer />
    </>
  );
}

export default Home;
