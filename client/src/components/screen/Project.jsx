// Function
import styles from '../../styles/screen/css/Project.module.css';
import { server, uploadFile } from './Home';
import { initial } from '../../_redux/_reducer/InfoSlice';

// Package
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function Project({ id, logged, date, title, member, img, language }) {
  // React 세팅
  const [inputDate, setInputDate] = useState(date);
  const [inputMember, setInputMember] = useState(member);
  const [inputTitle, setInputTitle] = useState(title);
  const [inputImg, setInputImg] = useState('');
  const [imgPreview, setImgPreview] = useState(
    `${process.env.REACT_APP_SERVER}/image/${img}`
  );
  const [inputLanguage, setInputLanguage] = useState(language);
  const [more, setMore] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  // 프로젝트 삭제
  const onClick = async () => {
    // 서버에 삭제 요청
    const { status } = await server.post(`/project/${id}/delete`, { img });
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
    formData.append('member', inputMember);
    formData.append('img', inputImg);
    formData.append('language', inputLanguage);
    formData.append('beforeId', id);
    formData.append('beforeImg', img);
    // 프로젝트 업데이트 요청
    await uploadFile.post(`/project/${id}/edit`, formData);
    // 프로젝트 변경으로 인해 재 렌더링 요청
    dispatch(initial(false));
    // 수정하기 종료
    setEdit(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'date':
        setInputDate(value);
        break;
      case 'member':
        const arrMemberValue = value.split(',').map((item) => item.trim());
        setInputMember(arrMemberValue);
        break;
      case 'title':
        setInputTitle(value);
        break;
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
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles.project}>
        {logged ? (
          more ? (
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
                name="member"
                type="text"
                placeholder="개발자"
                value={inputMember}
                onChange={onChange}
                className={styles.member}
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
                  <img src={imgPreview} alt="미리보기" className={styles.img} />
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
        <div className={edit ? styles.hidden : null}>
          <small className={styles.date}>{date.substring(0, 10)}</small>
          <small className={styles.member}>{member}</small>
          <Link to={`/project/${id}`}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.imgWrap}>
              <img
                className={styles.img}
                src={`${process.env.REACT_APP_SERVER}/image/${img}`}
                alt="preview"
              />
            </div>
          </Link>
          <div className={styles.language}>
            {language[0].split(',').map((item, index) => {
              return <i key={index} className={item} title={item}></i>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
