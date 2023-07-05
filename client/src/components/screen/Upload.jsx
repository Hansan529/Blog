// Component
import Header from '../partials/Header';
import Footer from '../partials/Footer';

// Function
import { server, uploadFile } from './Home';
import { init } from '../../_redux/_reducer/HomeSlice';
import styles from '../../styles/screen/css/Upload.module.css';

// Package
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Loading from '../config/Loading';

function Upload() {
  // React Setting
  const date = new Date();
  const [loading, setLoading] = useState(true);
  const [inputDate, setInputDate] = useState(
    `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  );
  const [inputTitle, setInputTitle] = useState('');
  const [select, setSelect] = useState([]);
  const [inputImg, setInputImg] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [inputLanguage, setInputLanguage] = useState([]);
  const [inputBody, setInputBody] = useState([]);
  const [admin, setAdmin] = useState(null);
  // const [adminEmails, setAdminEmails] = useState(null);
  const logged = useSelector((state) => state.login.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // * 개발자 이미지 요청
  const adminImg = async () => {
    const { data } = await server.get('/avatarImg');
    if (!data) {
      return navigate('/');
    }
    setAdmin(data);
    setLoading(false);
  };

  // * 개발자 선택
  const devSelect = (e) => {
    const data = e.currentTarget.dataset.id;
    const duplicated = select.includes(data);
    if (duplicated) {
      setSelect((prevData) => prevData.filter((id) => id !== data));
    } else {
      setSelect((prevData) => [...prevData, data]);
    }
  };

  // * 업로드 시도
  const onSubmit = async (e) => {
    e.preventDefault();
    // multipart/form-data 생성
    const formData = new FormData();
    formData.append('date', inputDate);
    formData.append('title', inputTitle);
    formData.append('member', select);
    formData.append('img', inputImg);
    formData.append('language', inputLanguage);
    formData.append('body', inputBody);
    // Project 생성 요청
    const { status, data } = await uploadFile.post('/upload', formData);
    if (status === 201) {
      // 프로젝트 생성 성공, 홈 루트의 프로젝트 갱신처리
      dispatch(init(false));
      // 해당 프로젝트 상세 페이지로 이동
      navigate(`/project/${data}`);
    }
  };

  // * 데이터 기입
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
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
      // 순서 정렬을 위해 업로드한 시간 정보 추가
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

  /**
   ** 최초 로딩 시, 비로그인일 경우 로그인 페이지로 이동
   ** 로그인했을 경우 이미지 요청
   */
  useEffect(() => {
    if (!logged) {
      navigate('/login');
    } else {
      adminImg();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <main>
            <div>
              <form onSubmit={onSubmit} method="POST" className={styles.form}>
                <label>
                  <p className={styles.name}>날짜</p>
                  <input
                    name="date"
                    type="date"
                    onChange={onChange}
                    value={inputDate}
                  />
                </label>
                <label>
                  <p className={styles.name}>제목</p>
                  <input
                    name="title"
                    type="text"
                    value={inputTitle}
                    onChange={onChange}
                    placeholder="제목"
                  />
                </label>
                <label>
                  <p className={styles.name}>개발자</p>
                  <div className={styles.select}>
                    <ul className={styles.select}>
                      {admin.map((value, index) => (
                        <li
                          key={index}
                          data-id={value.email.split('@')[0]}
                          onClick={devSelect}
                        >
                          {select.map((data, index) =>
                            data === value.email.split('@')[0] ? (
                              <i key={index} className={styles.check}></i>
                            ) : null
                          )}
                          <img src={value.img} alt="" crossOrigin="anonymous" />{' '}
                          {value.email.split('@')[0]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </label>
                <label>
                  <p className={styles.name}>이미지</p>
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
                  <p className={styles.name}>언어</p>
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
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

// Upload.propTypes = {
//   inputTitle: PropTypes.string.isRequired,
//   inputMember: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//   inputImgSrc: PropTypes.string.isRequired,
//   inputImg: PropTypes.string.isRequired,
//   inputLanguage: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
// };

export default Upload;
