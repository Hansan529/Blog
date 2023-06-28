// Component
import Header from '../partials/Header';
import Footer from '../partials/Footer';

// Package
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// Function
import { downloadFiles, uploadFile } from './Home';

function Upload() {
  // React Setting
  const [inputTitle, setInputTitle] = useState('');
  const [inputMember, setInputMember] = useState([]);
  const [inputImg, setInputImg] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [inputLanguage, setInputLanguage] = useState([]);
  const navigate = useNavigate();

  // *
  const onSubmit = async (e) => {
    e.preventDefault();
    // multipart/form-data 생성
    const formData = new FormData();
    formData.append('title', inputTitle);
    formData.append('member', inputMember);
    formData.append('img', inputImg);
    formData.append('language', inputLanguage);
    const {
      status,
      data: {
        img: { filename },
      },
    } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (status === 201) {
      navigate(`/project/${filename}`);
    }
  };

  // *
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    switch (name) {
      case 'title':
        setInputTitle(value);
        return;
      case 'member':
        const arrMemberValue = value.split(',').map((item) => item.trim());
        setInputMember(arrMemberValue);
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
            console.log(fileReader);
            setImgPreview(fileReader.result || null);
            resolve();
          };
        });
      // 순서 정렬을 위해 업로드한 시간 정보 추가
      case 'language':
        const arrLanguageValue = value.split(',').map((item) => item.trim());
        setInputLanguage(arrLanguageValue);
        return;
      default:
        break;
    }
  };

  return (
    <>
      <Header />
      <main>
        <div>
          <p>업로드 페이지</p>
          <form onSubmit={onSubmit} method="POST">
            <input
              name="title"
              type="text"
              value={inputTitle}
              onChange={onChange}
              placeholder="제목"
            />
            <input
              name="member"
              type="text"
              value={inputMember}
              onChange={onChange}
              placeholder="개발자"
            />
            <input
              name="img"
              type="file"
              onChange={onChange}
              placeholder="이미지"
              accept="image/*"
            />
            <small>최대 용량 5MB</small>
            <img src={imgPreview} alt="preview" />
            <input
              name="language"
              type="text"
              value={inputLanguage}
              onChange={onChange}
              placeholder="언어"
            />
            <button type="submit">업로드</button>
          </form>
        </div>
      </main>
      <Footer />
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