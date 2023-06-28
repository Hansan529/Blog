// Component 불러오기
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Project from './Project';

// Function
import { load } from '../../_redux/_reducer/HomeSlice';

// Package
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// * axios 인스턴스
const baseURL = process.env.REACT_APP_API_ENDPOINT;

export const uploadFile = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 5000,
});
export const downloadFiles = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  timeout: 5000,
});

function Home() {
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState('');
  const logged = useSelector((state) => state.login.value);
  const initPage = useSelector((state) => state.home.value);
  const dispatch = useDispatch();

  // *
  // 최초 접속 시 API 요청
  const fetchData = async () => {
    const { data } = await downloadFiles.get('/');
    setProjectData(data);
    dispatch(load(true));
    setLoading(false);
  };

  useEffect(() => {
    if (!initPage) {
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
            <Link to="/upload">업로드</Link>
          </article>
        ) : null}
        <Project />
        {loading
          ? null
          : projectData.map((data, index) => {
              return (
                <Project
                  key={data._id}
                  title={data.title}
                  member={data.member}
                  img={data.img}
                  language={data.language}
                />
              );
            })}
      </main>
      <Footer />
    </>
  );
}

export default Home;
