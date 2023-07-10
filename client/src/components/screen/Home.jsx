// Component 불러오기
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Page from '../partials/Page';
import Project from './Project';

// Function
import { set } from '../../_redux/_reducer/ProejctSlice';
import styles from '../../styles/screen/css/Home.module.css';
import { initial } from '../../_redux/_reducer/InfoSlice';
import { getAdminAvatar } from '../../_redux/_reducer/fetchSlice';

// Package
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// * axios 인스턴스
const baseURL = process.env.REACT_APP_API_ENDPOINT;
// Multipart/form-dat 형식으로 파일 전송
export const uploadFile = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 5000,
});
// JSON 타입으로 전송하기
export const downloadFiles = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  timeout: 5000,
});
// 일반적인 요청
export const server = axios.create({
  baseURL,
  timeout: 5000,
});

// ! Home 컴포넌트
function Home() {
  // React 설정
  const [loading, setLoading] = useState(true);
  const logged = useSelector((state) => state.info.logged);
  const initPage = useSelector((state) => state.info.initial);
  const project = useSelector((state) => state.project.value);
  const dispatch = useDispatch();

  // *
  // 프로젝트 목록 API 요청
  const fetchData = async () => {
    // API 요청
    const { data } = await downloadFiles.get('/');
    // 1회 접속 저장
    dispatch(initial(true));
    // API 결과 값 저장
    dispatch(set(data));
    // 로딩 완료
    setLoading(false);
  };

  // *
  useEffect(() => {
    // 최초 접속했을 경우 API 요청하기
    if (!initPage) {
      fetchData();
      return;
    }
    // API 값이 이미 있으면 로딩 완료처리
    setLoading(false);
    return;
  }, [initPage]);

  return (
    <>
      <Header />
      <main>
        <Page />
        <article className={styles.grid}>
          <div id="project" className="part"></div>
          {loading
            ? null
            : project.map((data) => {
                return (
                  <Project
                    key={data._id}
                    id={data._id}
                    logged={logged}
                    date={data.date}
                    title={data.title}
                    developer={data.developer}
                    thumbnail={data.thumbnail}
                    language={data.language}
                  />
                );
              })}
        </article>
      </main>
      <Footer />
    </>
  );
}

export default Home;
