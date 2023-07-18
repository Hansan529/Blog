// Components
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Loading from '../config/Loading';
// Function
import { downloadFiles, server, uploadFile } from './Home';
import styles from '../../styles/screen/css/DetailProject.module.css';
import { initial } from '../../_redux/_reducer/InfoSlice';

// Package
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DetailProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 상태 정보
  const logged = useSelector((state) => state.info.logged);
  const initPage = useSelector((state) => state.info.initial);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [project, setProject] = useState('');
  const [allProject, setAllProject] = useState(null);
  const [asideProject, setAsideProject] = useState(null);
  const devAvatar = useSelector((state) => state.fetchData.devAvatar);
  const [importLoading, setImportLoading] = useState(true);

  // 유저 행동에 따른 값 변화
  const [edit, setEdit] = useState(false);
  const [inputUrl, setInputUrl] = useState(null);
  const [inputDate, setInputDate] = useState(null);
  const [inputTitle, setInputTitle] = useState(null);
  const [developerSelect, setDeveloperSelect] = useState([]);
  const [inputThumbnail, setInputThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [inputLanguage, setInputLanguage] = useState([]);
  const [inputDescription, setInputDescription] = useState([]);
  const [beforeThumbnail, setBeforeThumbnail] = useState(null);

  // * 모든 프로젝트 필터로 10개씩만 보여주기
  const asideFilter = () => {
    const filterProject = 10;
    const startIndex = filterProject - 1;

    const filterData = allProject.filter(
      (item, index) => (index) =>
        startIndex && index <= startIndex + filterProject
    );
    setAsideProject(filterData);
    setLoading(false);
  };

  // * 프로젝트 내용 불러오기 #2
  const info = async () => {
    const data = await (await downloadFiles('/')).data;
    // 현재 접근한 프로젝트 필터링
    const filterData = data.filter((value) => value._id === id)[0];
    setProject(filterData);
    // 나머지 전체 프로젝트
    setAllProject(data);
    // 기존값 설정
    const { url, date, title, developer, thumbnail, language, description } =
      filterData;
    setInputUrl(url);
    setInputDate(date);
    setInputTitle(title);
    setDeveloperSelect(developer);
    setInputThumbnail(thumbnail);
    setThumbnailPreview(`${process.env.REACT_APP_SERVER}/image/${thumbnail}`);
    setInputLanguage(language);
    setInputDescription(description);
    setBeforeThumbnail(thumbnail);
  };

  // * 프로젝트가 설정되면 Aside 필터 실행
  useEffect(() => {
    if (allProject) {
      asideFilter();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProject]);

  // * 페이지 로딩이 완료되면 최초 실행, 프로젝트 수정이 완료되면 실행 #1
  useEffect(() => {
    if (!edit) {
      info();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initPage, edit, loading]);

  // * 해당 페이지에서 새로고침할 경우, 개발자 이미지 데이터가 적용되면(App.jsx) 로딩 완료
  useEffect(() => {
    if (devAvatar) {
      setImportLoading(false);
    }
  }, [devAvatar]);

  // ^ Event
  // ^ 개발자 선택
  const devSelect = (e) => {
    const data = e.currentTarget.dataset.id;
    const duplicated = developerSelect.includes(data);
    if (duplicated) {
      setDeveloperSelect((prevData) => prevData.filter((id) => id !== data));
    } else {
      setDeveloperSelect((prevData) => [...prevData, data]);
    }
  };

  // ^ 수정하기
  const onClick = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  // ^ 삭제하기
  const deleteProject = async () => {
    // 서버에 삭제 요청
    const { status } = await server.delete(`/projects/${id}/${inputThumbnail}`);
    if (status === 200) {
      // 프로젝트 변경으로 인해 재 렌더링 요청
      dispatch(initial(false));
      navigate('/');
    }
  };

  // ^ 데이터 저장
  const onChange = (e) => {
    const { name, value } = e.target;
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
        const file = e.target.files[0];
        file.date = new Date();
        // 업로드할 이미지 파일
        setInputThumbnail(file);

        // 미리보기 이미지용
        const fileReader = new FileReader(); // 파일을 읽음
        fileReader.readAsDataURL(file); // 결과에 파일 데이터를 나타내는 URL을 포함시킴

        return new Promise((resolve) => {
          // 비동기 작업 처리
          fileReader.onload = () => {
            // 로드가 완료되면 실행
            setThumbnailPreview(fileReader.result || null);
            resolve();
          };
        });
      case 'language':
        setInputLanguage(value);
        return;
      case 'description':
        setInputDescription(value);
        return;
      default:
        break;
    }
  };

  const editCancel = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  // ^ 수정 업데이트
  const onSubmit = async (e) => {
    e.preventDefault();

    // Form 생성
    const formData = new FormData();
    formData.append('url', inputUrl);
    formData.append('date', inputDate);
    formData.append('title', inputTitle);
    formData.append('developer', developerSelect);
    formData.append('thumbnail', inputThumbnail);
    formData.append('language', inputLanguage);
    formData.append('description', inputDescription);
    formData.append('beforeId', id);
    formData.append('beforeThumbnail', beforeThumbnail);

    // 수정 요청
    await uploadFile.put(`/projects/${id}/edit`, formData);

    // 재렌더링 및 수정하기 종료
    dispatch(initial(false));
    setEdit(false);
  };

  // ^ 이전 페이지로 이동
  const prevPage = () => {
    navigate('/');
  };

  return (
    <>
      <Header />
      {loading || importLoading ? (
        <Loading />
      ) : (
        <>
          <main>
            <article className={styles.article}>
              <aside className={styles.aside}>
                <ul>
                  {asideProject.map((value, index) => (
                    <li key={index}>
                      <Link
                        className={value._id === id ? styles.active : null}
                        onClick={() => setLoading(true)}
                        to={`/projects/${value._id}`}
                      >
                        {value.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
              {edit ? (
                importLoading ? null : (
                  <>
                    <form
                      method="POST"
                      onSubmit={onSubmit}
                      className={styles.form}
                    >
                      <button
                        className={styles.editCancel}
                        onClick={editCancel}
                      ></button>
                      <label>
                        <p className={styles.url}>프로젝트 주소</p>
                        <input
                          name="url"
                          type="url"
                          onChange={onChange}
                          value={inputUrl}
                        />
                      </label>
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
                            {devAvatar.map((value, index) => (
                              <li
                                key={index}
                                data-id={value.username}
                                onClick={devSelect}
                              >
                                {developerSelect.map((data, index) =>
                                  data === value.username ? (
                                    <i key={index} className={styles.check}></i>
                                  ) : null
                                )}
                                <img
                                  src={value.img}
                                  alt=""
                                  crossOrigin="anonymous"
                                />{' '}
                                {value.username}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </label>
                      <label>
                        <p className={styles.name}>이미지</p>
                        <input
                          name="thumbnail"
                          type="file"
                          onChange={onChange}
                          placeholder="이미지"
                          accept="image/*"
                        />
                      </label>
                      {thumbnailPreview ? (
                        <img src={thumbnailPreview} alt="" />
                      ) : null}
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
                          name="description"
                          type="text"
                          value={inputDescription}
                          onChange={onChange}
                          placeholder="본문"
                        />
                      </label>
                      <button type="submit">수정</button>
                    </form>
                  </>
                )
              ) : (
                <>
                  <div className={styles.topWrap}>
                    <div className={styles.devImgWrap}>
                      {devAvatar.map((value, index) => {
                        return value.username === project.developer.join() ? (
                          <div key={index}>
                            <img
                              src={value.img}
                              className={styles.devImg}
                              alt={value.username}
                            />
                            <p>{value.username}</p>
                          </div>
                        ) : (
                          <div key={index}>
                            <p>{value.username}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className={styles.titleWrap}>
                      <h2>{project.title}</h2>
                      <small>{project.date.substring(0, 10)}</small>
                    </div>
                    {logged ? (
                      <div className={styles.edit}>
                        <button onClick={onClick}>수정하기</button>
                        <button onClick={deleteProject}>삭제하기</button>
                      </div>
                    ) : (
                      <span className={styles.empty}></span>
                    )}
                  </div>
                  <Link to={project.url} target="_blank">
                    <figure>
                      <picture className={styles.picture}>
                        <img
                          src={`${process.env.REACT_APP_SERVER}/image/${project.thumbnail}`}
                          alt="이미지"
                        />
                      </picture>
                      <figcaption className={styles.info}>
                        <i className={styles.url}></i> {project.title} 홈페이지
                        이동하기
                      </figcaption>
                    </figure>
                  </Link>
                  <div className={styles.language}>
                    {!project
                      ? null
                      : project.language.map((item, index) => {
                          return (
                            <div key={index} className={item}>
                              <img
                                className={styles.logoImg}
                                src={`${
                                  process.env.PUBLIC_URL
                                }/images/ico/${item.toLowerCase()}-icon.svg`}
                                alt={item}
                              />
                              <p>{item}</p>
                            </div>
                          );
                        })}
                  </div>
                  <pre className={styles.description}>
                    {project.description}
                  </pre>
                </>
              )}
              <button className={styles.prevBtn} onClick={prevPage}></button>
            </article>
          </main>
        </>
      )}
      <Footer />
    </>
  );
}

export default DetailProject;
