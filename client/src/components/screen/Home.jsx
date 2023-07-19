// Component 불러오기
import Header from '../partials/Header';
import Loading from '../config/Loading';
import Homepage from '../partials/Homepage';
import Projects from '../partials/Projects';
import Footer from '../partials/Footer';

// Function
import { initial } from '../../_redux/_reducer/InfoSlice';
import { projectData } from '../../_redux/_reducer/ProejctSlice';

// Package
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Info from '../partials/Info';

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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const initPage = useSelector((state) => state.info.initial);
  const [homepage, setHomepage] = useState('');
  const [project, setProject] = useState('');
  const [info, setInfo] = useState('');

  const onHomepage = (value) => {
    setHomepage(value);
  };

  const onProject = (value) => {
    setProject(value);
  };

  const onInfo = (value) => {
    setInfo(value);
  };

  // *
  // 프로젝트 목록 API 요청
  const fetchData = async () => {
    // API 요청
    const { data } = await downloadFiles.get('/');
    // 1회 접속 저장
    dispatch(initial(true));
    // API 결과 값 저장
    dispatch(projectData(data));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initPage]);

  // React 설정
  return (
    <>
      <Header homepage={homepage} project={project} info={info} />
      {loading ? (
        <Loading />
      ) : (
        <main>
          <Homepage LinkHomepage={onHomepage} project={project} />
          <Projects LinkProject={onProject} />
          <Info LinkInfo={onInfo} />
        </main>
      )}
      <Footer />
    </>
  );
}

export default Home;
