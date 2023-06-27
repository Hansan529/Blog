// Component 불러오기
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Project from './Project';

// Function
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { load } from '../../_redux/_reducer/HomeSlice';
import axios from 'axios';

function Home() {
  const logged = useSelector((state) => state.login.value);
  const pageLoading = useSelector((state) => state.home.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await (
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/`)
      ).data;
      console.log('response: ', response);
      dispatch(load(true));
    };
    if (!pageLoading) {
      fetchData();
    }
    return;
  }, []);
  return (
    <>
      <Header />
      <main>
        {logged ? (
          <article>
            <Project />
          </article>
        ) : null}
      </main>
      <Footer />
    </>
  );
}

export default Home;
