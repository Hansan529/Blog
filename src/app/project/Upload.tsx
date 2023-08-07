'use client';

// Function

// Package
import './Upload.modules.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/navigation';
import { api, formApi } from '../../axios';

export default function Upload() {
  // React Setting
  const date = new Date();
  const [admin, setAdmin] = useState(null); //img, username
  const logged = useSelector((state: RootState) => state.auth.value.isAuth);
  console.log('logged: ', logged);
  const dispatch = useDispatch();
  const router = useRouter();
  // input
  const [inputUrl, setInputUrl] = useState<string>('');
  const [inputDate, setInputDate] = useState<string>(
    `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  );
  const [inputTitle, setInputTitle] = useState<string>('');
  const [developerSelect, setDeveloperSelect] = useState<string[]>([]);
  const [inputThumbnail, setInputThumbnail] = useState<string>('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [inputLanguage, setInputLanguage] = useState<string[]>([]);
  const [inputDescription, setInputDescription] = useState<string>();

  // * 개발자 이미지 요청
  const adminImg = async () => {
    //   if (!devAvatar) {
    //     return navigate('/');
    //   }
    //   setAdmin(devAvatar);
  };

  // * 개발자 선택
  const devSelect = (e) => {
    const data = e.currentTarget.dataset.id;
    const duplicated = developerSelect.includes(data);
    if (duplicated) {
      setDeveloperSelect((prevData) => prevData.filter((id) => id !== data));
    } else {
      setDeveloperSelect((prevData) => [...prevData, data]);
    }
  };

  // * 업로드 시도
  const projectUpload = async (e) => {
    e.preventDefault();
    // multipart/form-data 생성
    const formData = new FormData();
    formData.append('url', inputUrl);
    formData.append('date', inputDate);
    formData.append('dateSearch', inputDate);
    formData.append('title', inputTitle);
    formData.append('developer', String(developerSelect));
    formData.append('thumbnail', inputThumbnail);
    formData.append('language', String(inputLanguage));
    formData.append('description', inputDescription);
    // Project 생성 요청
    // const { status, data } = await formApi.post('/project', formData);
    // if (status === 201) {
    //   // 프로젝트 생성 성공, 홈 루트의 프로젝트 갱신처리
    //   //   dispatch(initial(false));
    //   // 해당 프로젝트 상세 페이지로 이동
    //   //   navigate(`/projects/${data}`);
    //   router.push(`/projects/${data}`);
    // }
  };

  // & 업로드 시도
  const infoUpload = async (e) => {
    e.preventDefault();
    // Project 생성 요청
    await api.post('/db/project', {
      date: inputDate,
      title: inputTitle,
      description: inputDescription,
    });
    // dispatch(initial(false));
    // navigate('/');
    router.push('/');
  };

  // * 데이터 기입
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = e;
    switch (name) {
      case 'url':
        setInputUrl(value);
        return;
      case 'date':
        setInputDate(value);
        return;
      case 'title':
        setInputTitle(value);
        return;
      case 'thumbnail':
      // const file = e.target.files[0];
      // file.date = new Date();
      // // 업로드할 이미지 파일
      // setInputThumbnail(file);

      // // 미리보기 이미지용
      // const fileReader = new FileReader(); // 파일을 읽음
      // fileReader.readAsDataURL(file); // 결과에 파일 데이터를 나타내는 URL을 포함시킴

      // return new Promise((resolve) => {
      //   // 비동기 작업 처리
      //   fileReader.onload = () => {
      //     // 로드가 완료되면 실행
      //     setThumbnailPreview(fileReader.result || null);
      //     resolve();
      //   };
      // });
      // 순서 정렬을 위해 업로드한 시간 정보 추가
      case 'language':
        setInputLanguage([value]);
        return;
      case 'description':
        setInputDescription(value);
        return;
      default:
        break;
    }
  };

  /**
   ** 최초 로딩 시, 비로그인일 경우 로그인 페이지로 이동
   ** 로그인했을 경우 이미지 요청
   */
  //   useEffect(() => {
  //     if (!logged) {
  //       router.push('/login');
  //     } else {
  //       adminImg();
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  return (
    <>
      <main>
        <article className="article">
          {/* 프로젝트 업로드 */}
          <div>
            <h3 className="title">프로젝트 업로드</h3>
            <form onSubmit={projectUpload} method="POST" className="form">
              <label>
                <p className="url">프로젝트 주소</p>
                <input
                  name="url"
                  type="url"
                  onChange={onChange}
                  value={inputUrl}
                />
              </label>
              <label>
                <p className="name">날짜</p>
                <input
                  name="date"
                  type="date"
                  onChange={onChange}
                  value={inputDate}
                />
              </label>
              <label>
                <p className="name">제목</p>
                <input
                  name="title"
                  type="text"
                  value={inputTitle}
                  onChange={onChange}
                  placeholder="제목"
                />
              </label>
              <label>
                <p className="name">개발자</p>
                <div className="select">
                  <ul>
                    {/* {admin.map((value, index) => (
                      <li
                        key={index}
                        data-id={value.username}
                        onClick={devSelect}
                      >
                        {developerSelect.map((data, index) =>
                          data === value.username ? (
                            <i key={index} className="check"></i>
                          ) : null
                        )}
                        <img src={value.img} alt="" crossOrigin="anonymous" />{' '}
                        <span className="developerName">{value.username}</span>
                      </li>
                    ))} */}
                  </ul>
                </div>
              </label>
              <label>
                <p className="name">이미지</p>
                <input
                  name="thumbnail"
                  type="file"
                  onChange={onChange}
                  placeholder="이미지"
                  accept="image/*"
                />
              </label>
              {thumbnailPreview ? <img src={thumbnailPreview} alt="" /> : null}
              <label>
                <p className="name">언어</p>
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
                  name="description"
                  value={inputDescription}
                  onChange={onChange}
                  placeholder="본문"
                />
              </label>
              <button type="submit">업로드</button>
            </form>
          </div>
          {/*
           *
           *
           * 정보 게시글 업로드
           *
           *
           * */}
          <div>
            <h3 className="title">정보 게시글 업로드</h3>
            <form onSubmit={infoUpload} method="POST" className="form">
              <label>
                <p className="name">날짜</p>
                <input
                  name="date"
                  type="date"
                  onChange={onChange}
                  value={inputDate}
                />
              </label>
              <label>
                <p className="name">제목</p>
                <input
                  name="title"
                  type="text"
                  value={inputTitle}
                  onChange={onChange}
                  placeholder="제목"
                />
              </label>
              <label>
                <textarea
                  name="description"
                  value={inputDescription}
                  onChange={onChange}
                  placeholder="본문"
                />
              </label>
              <button type="submit">업로드</button>
            </form>
          </div>
        </article>
      </main>
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
