// Components
import Header from '../partials/Header';
import Footer from '../partials/Footer';

// Function
import { server } from './Home';
import extendStyles from '../../styles/screen/css/Upload.module.css';
import styles from '../../styles/screen/css/DetailProject.module.css';

// Package
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../config/Loading';
import { useSelector } from 'react-redux';

function DetailProject() {
  const logged = useSelector((state) => state.login.value);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [project, setProject] = useState('');
  const [edit, setEdit] = useState(false);

  const [inputDate, setInputDate] = useState(null);
  const [inputTitle, setInputTitle] = useState(null);
  const [select, setSelect] = useState([]);
  const [inputImg, setInputImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [inputLanguage, setInputLanguage] = useState([]);
  const [inputBody, setInputBody] = useState([]);
  const [admin, setAdmin] = useState('');

  // * 개발자 이미지 요청
  const adminImg = async () => {
    const { data } = await server.get('/avatarImg');
    if (!data) {
      return;
    }
    setAdmin(data);
  };

  // * 프로젝트 내용 불러오기 #2
  const info = async () => {
    const data = await (await server.get(`/project/${id}`)).data;
    setProject(data);
    setLoading(false);
    // 기존값 설정
    const { date, title, img, language, body } = data;
    setInputDate(date);
    setInputTitle(title);
    setImgPreview(`${process.env.REACT_APP_SERVER}/image/${img}`);
    setInputLanguage(language);
    setInputBody(body);
  };

  // * 페이지 로딩이 완료되면 최초 실행 #1
  useEffect(() => {
    info();
  }, []);

  // * 프로젝트 수정할 경우 실행
  // TODO 의존형 추가하기
  useEffect(() => {
    adminImg();
  }, []);

  // ^ Event
  // ^ 개발자 선택
  const devSelect = (e) => {
    const data = e.currentTarget.dataset.id;
    const duplicated = select.includes(data);
    if (duplicated) {
      setSelect((prevData) => prevData.filter((id) => id !== data));
    } else {
      setSelect((prevData) => [...prevData, data]);
    }
  };

  // ^ 수정하기
  const onClick = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  // ^ 데이터 저장
  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'date':
        setInputDate(value);
        return;
      case 'title':
        setInputTitle(value);
        return;
      case 'img':
        const file = e.target.files[0];
        file.date = new Date();
        // 업로드할 이미지 파일
        setInputImg(file);

        // 미리보기 이미지용
        const fileReader = new FileReader(); // 파일을 읽음
        fileReader.readAsDataURL(file); // 결과에 파일 데이터를 나타내는 URL을 포함시킴

        return new Promise((resolve) => {
          // 비동기 작업 처리
          fileReader.onload = () => {
            // 로드가 완료되면 실행
            setImgPreview(fileReader.result || null);
            resolve();
          };
        });
      case 'language':
        const arrLanguageValue = value.split(',').map((item) => item.trim());
        setInputLanguage(arrLanguageValue);
        return;
      case 'body':
        setInputBody(value);
        return;
      default:
        break;
    }
  };

  // ^ 수정 업데이트
  const onSubmit = () => {};

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <main>
            {logged ? <button onClick={onClick}>수정하기</button> : null}
            {edit ? (
              <>
                <form
                  onSubmit={onSubmit}
                  method="POST"
                  className={extendStyles.form}
                >
                  <label>
                    <p className={extendStyles.name}>날짜</p>
                    <input
                      name="date"
                      type="date"
                      onChange={onChange}
                      value={inputDate}
                    />
                  </label>
                  <label>
                    <p className={extendStyles.name}>제목</p>
                    <input
                      name="title"
                      type="text"
                      value={inputTitle}
                      onChange={onChange}
                      placeholder="제목"
                    />
                  </label>
                  <label>
                    <p className={extendStyles.name}>개발자</p>
                    <div className={extendStyles.select}>
                      <ul className={extendStyles.select}>
                        {admin.map((value, index) => (
                          <li
                            key={index}
                            data-id={value.email.split('@')[0]}
                            onClick={devSelect}
                          >
                            {select.map((data, index) =>
                              data === value.email.split('@')[0] ? (
                                <i
                                  key={index}
                                  className={extendStyles.check}
                                ></i>
                              ) : null
                            )}
                            <img
                              src={value.img}
                              alt=""
                              crossOrigin="anonymous"
                            />{' '}
                            {value.email.split('@')[0]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </label>
                  <label>
                    <p className={extendStyles.name}>이미지</p>
                    <input
                      name="img"
                      type="file"
                      onChange={onChange}
                      placeholder="이미지"
                      accept="image/*"
                    />
                  </label>
                  {imgPreview ? <img src={imgPreview} alt="" /> : null}
                  <label>
                    <p className={extendStyles.name}>언어</p>
                    <input
                      name="language"
                      type="text"
                      value={inputLanguage}
                      onChange={onChange}
                      placeholder="언어"
                    />
                  </label>
                  <label>
                    <textarea
                      name="body"
                      type="text"
                      value={inputBody}
                      onChange={onChange}
                      placeholder="본문"
                    />
                  </label>
                  <button type="submit">업로드</button>
                </form>
              </>
            ) : (
              <>
                <h2>{project.title}</h2>
                <small>{project.date}</small>
                <p>{project.member}</p>
                <picture className={extendStyles.picture}>
                  <img
                    src={`${process.env.REACT_APP_SERVER}/image/${project.img}`}
                    alt="이미지"
                  />
                </picture>
                <p>{project.language}</p>
                <pre>{project.body}</pre>
              </>
            )}
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default DetailProject;
