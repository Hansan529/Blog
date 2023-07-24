// Function
import styles from '../../styles/mixins/css/Project.module.css';
import { server, uploadFile } from '../screen/Home';
import { initial } from '../../_redux/_reducer/InfoSlice';

// Package
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function Project({ id, logged, date, title, developer, thumbnail, language }) {
  // React 세팅
  const dispatch = useDispatch();
  const [inputDate, setInputDate] = useState(date);
  const [inputDeveloper, setInputDeveloper] = useState(developer);
  const [inputTitle, setInputTitle] = useState(title);
  const [inputThumbnail, setInputThumbnail] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState(
    `${process.env.REACT_APP_SERVER}/image/${thumbnail}`
  );
  const [inputLanguage, setInputLanguage] = useState(language);
  // 프로젝트 수정 관련 State
  const [more, setMore] = useState(false);
  const [edit, setEdit] = useState(false);
  // 개발자 이미지 정보
  const devAvatar = useSelector((state) => state.fetchData.devAvatar); // img, username
  // 프로젝트 삭제
  const onClick = async () => {
    // 서버에 삭제 요청
    const { status } = await server.delete(`/projects/${id}/${thumbnail}`);
    if (status === 200) {
      // 프로젝트 변경으로 인해 재 렌더링 요청
      dispatch(initial(false));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // 수정사항 파일 전송용 formData 생성
    const formData = new FormData();
    formData.append('date', inputDate);
    formData.append('title', inputTitle);
    formData.append('developer', inputDeveloper);
    formData.append('thumbnail', inputThumbnail);
    formData.append('language', inputLanguage);
    formData.append('beforeId', id);
    formData.append('beforeImg', thumbnail);
    // 프로젝트 업데이트 요청
    await uploadFile.put(`/projects/${id}/edit`, formData);
    // 프로젝트 변경으로 인해 재 렌더링 요청
    dispatch(initial(false));
    // 수정하기 종료
    setEdit(false);
    setMore(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'date':
        setInputDate(value);
        break;
      case 'developer':
        const arrDeveloperValue = value.split(',').map((item) => item.trim());
        setInputDeveloper(arrDeveloperValue);
        break;
      case 'title':
        setInputTitle(value);
        break;
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
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.project}>
        {/* 로그인을 한 상태(Admin) 일 경우 프로젝트 정보 더보기 버튼이 활성화 */}
        {logged ? (
          more ? (
            // 더보기 버튼이 눌렸을 경우, 3가지의 아이콘이 생성됨 (삭제, 수정, 취소)
            <div className={styles.edit}>
              <button type="button" onClick={onClick}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/ico/ban.svg`}
                  alt="삭제"
                />
              </button>
              {edit ? null : (
                <button onClick={() => setEdit(true)} type="reset">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/ico/edit.svg`}
                    alt="수정하기"
                  />
                </button>
              )}
              <button
                onClick={() => {
                  setMore(false);
                  setEdit(false);
                }}
                type="reset"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/ico/cancel.svg`}
                  alt="취소하기"
                />
              </button>
            </div>
          ) : (
            <button className={styles.edit} onClick={() => setMore(true)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/ico/ellipsis.svg`}
                alt="더보기"
              />
            </button>
          )
        ) : null}
        {/* 수정하기를 한 경우, div 에서 form 요소로 변경 */}
        {edit ? (
          <>
            <form className={styles.form} onSubmit={onSubmit} method="POST">
              <input
                name="date"
                type="date"
                value={inputDate}
                onChange={onChange}
                className={styles.date}
              />
              <input
                name="developer"
                type="text"
                placeholder="개발자"
                value={inputDeveloper}
                onChange={onChange}
                className={styles.developer}
              />
              <input
                name="title"
                type="text"
                placeholder="타이틀"
                value={inputTitle}
                onChange={onChange}
                className={styles.title}
              />
              <div className={styles.imgWrap}>
                <label>
                  <img
                    src={thumbnailPreview}
                    alt="미리보기"
                    className={styles.thumbnail}
                  />
                  <input
                    name="img"
                    type="file"
                    onChange={onChange}
                    accept="image/*"
                  />
                </label>
              </div>
              <input
                name="language"
                type="text"
                placeholder="언어"
                value={inputLanguage}
                onChange={onChange}
                className={styles.language}
              />
              <button type="submit" className={styles.submit}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/ico/check.svg`}
                  alt="수정완료"
                />
              </button>
            </form>
          </>
        ) : null}
        {/* 수정하기를 한 경우, 기존 div는 숨김 처리함 */}
        <div className={edit ? styles.hidden : null}>
          {/* 업로드한 날짜 */}
          <small className={styles.date}>{date.substring(0, 10)}</small>
          {/* 개발자 이미지 배열 */}
          <small className={styles.developer}>
            {devAvatar.map((value, index) => {
              // Developer의 배열에서 해제하고, 비교
              return value.username === developer.join() ? (
                <img
                  key={index}
                  src={value.img}
                  className={styles.devImg}
                  alt={value.username}
                />
              ) : (
                value.username
              );
            })}
          </small>
          {/* 프로젝트 제목, 이미지 */}
          <Link to={`/projects/${id}`}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.imgWrap}>
              <img
                className={styles.img}
                src={`${process.env.REACT_APP_SERVER}/image/${thumbnail}`}
                alt="preview"
              />
            </div>
          </Link>
          {/* 프로젝트 사용 언어 */}
          <div className={styles.language}>
            {!language
              ? null
              : language.map((item, index) => {
                  return (
                    <img
                      key={index}
                      src={`${
                        process.env.PUBLIC_URL
                      }/images/ico/${item.toLowerCase()}-icon.svg`}
                      alt={item}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
