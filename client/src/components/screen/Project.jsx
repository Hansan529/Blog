// Function
import styles from '../../styles/screen/css/Project.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { uploadFile } from './Home';
import { useDispatch } from 'react-redux';
import { init } from '../../_redux/_reducer/HomeSlice';

function Project({ id, logged, title, member, img, language }) {
  // React 세팅
  const [inputMember, setInputMember] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [inputImg, setInputImg] = useState('');
  const [imgPreview, setImgPreview] = useState(undefined);
  const [inputLanguage, setInputLanguage] = useState('');
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const onClick = () => {
    // 프로젝트 간이 수정
    setEdit(true);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // 수정사항 파일 전송용 formData 생성
    const formData = new FormData();
    formData.append('title', inputTitle);
    formData.append('member', inputMember);
    formData.append('img', inputImg);
    formData.append('language', inputLanguage);
    formData.append('beforeId', id);
    formData.append('beforeImg', img);
    // 프로젝트 업데이트 요청
    uploadFile.post(`/project/${img}/edit`, formData);
    // 프로젝트 변경으로 인해 재 렌더링 요청
    dispatch(init(false));
    // 수정하기 종료
    setEdit(false);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
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
            console.log(fileReader);
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
    <div className={styles.project}>
      {logged ? <button onClick={onClick}>수정하기</button> : null}
      {/* 수정하기를 한 경우, div 에서 form 요소로 변경 */}
      {edit ? (
        <>
          <form onSubmit={onSubmit} method="POST">
            <input
              name="member"
              type="text"
              placeholder="개발자"
              value={inputMember}
              onChange={onChange}
              className={styles.project__member}
            />
            <input
              name="title"
              type="text"
              placeholder="타이틀"
              value={inputTitle}
              onChange={onChange}
              className={styles.project__title}
            />
            <input
              name="img"
              type="file"
              onChange={onChange}
              accept="image/*"
            />
            <img src={imgPreview} alt="" />
            <input
              name="language"
              type="text"
              placeholder="언어"
              value={inputLanguage}
              onChange={onChange}
              className={styles.project__language}
            />
            <button onClick={() => setEdit(false)} type="reset">
              X
            </button>
            <button type="submit">수정완료</button>
          </form>
        </>
      ) : (
        <>
          <div>
            <small className={styles.project__member}>{member}</small>
            <h3 className={styles.project__title}>{title}</h3>
          </div>
          <img
            className={styles.project__img}
            src={`${process.env.REACT_APP_SERVER}/image/${img}`}
            alt="preview"
          />
          <small>{language}</small>
        </>
      )}
    </div>
  );
}

export default Project;
