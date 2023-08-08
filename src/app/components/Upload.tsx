'use client';

// Function
import styles from './Upload.module.scss';

// Package
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { formApi } from '../../axios';

// const Upload = () => {
//   // React Setting
//   const date = new Date();
//   const dispatch = useDispatch();
//   const router = useRouter();
//   // input

//   // * 업로드 시도
//   const projectUpload = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // multipart/form-data 생성
//     console.log(
//       url,
//       date,
//       title,
//       inputImg,
//       language,
//       description
//     );
//     const formData = new FormData();
//     // formData.append('url', url);
//     // formData.append('date', date);
//     // formData.append('dateSearch', date);
//     // formData.append('title', title);
//     formData.append('img', inputImg);
//     // formData.append('language', String(language));
//     // formData.append('description', description);
//     // Project 생성 요청
//     try {
//       const { data } = await api.post('/db/project', formData);
//       console.log('data: ', data);
//     } catch (error) {
//       console.error('문제가 생겼습니다.');
//     }
//     // if (status === 201) {
//     //   // 프로젝트 생성 성공, 홈 루트의 프로젝트 갱신처리
//     //   //   dispatch(initial(false));
//     //   // 해당 프로젝트 상세 페이지로 이동
//     //   //   navigate(`/projects/${data}`);
//     //   router.push(`/projects/${data}`);
//     // }
//   };

//   // & 업로드 시도
//   const infoUpload = async (e) => {
//     e.preventDefault();
//     // Project 생성 요청
//     await api.post('/db/project', {
//       date: date,
//       title: title,
//       description: description,
//     });
//     // dispatch(initial(false));
//     // navigate('/');
//     router.push('/');
//   };

//   // * 데이터 기입
//   const onChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const {
//       target: { name, value },
//     } = e;
//     switch (name) {
//       case 'url':
//         setUrl(value);
//         return;
//       case 'date':
//         setDate(value);
//         return;
//       case 'title':
//         setTitle(value);
//         return;
//       case 'developer':
//         setDev([value]);
//         return;
//       case 'img':
//         const file = (e.target as HTMLInputElement).files;
//         console.log('file: ', file);
//         if (!file) return;
//         setInputImg(file[0]);

//
//         return;
//       case 'language':
//         setLanguage([value]);
//         return;
//       case 'description':
//         setDescription(value);
//         return;
//       default:
//         break;
//     }
//   };

//   /**
//    ** 최초 로딩 시, 비로그인일 경우 로그인 페이지로 이동
//    ** 로그인했을 경우 이미지 요청
//    */
//   useEffect(() => {
//     // if (!logged) {
//     //   router.push('/login');
//     // } else {
//     //   adminImg();
//     // }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <>
//       <main>
//         <article className="article">
//           {/* 프로젝트 업로드 */}
//           <div>
//             <h3 className="title">프로젝트 업로드</h3>
//             <form onSubmit={projectUpload} method="POST" className="form">
//               <label className={styles.uploadPart}>
//                 <p className="url">프로젝트 주소</p>
//                 <input
//                   name="url"
//                   type="url"
//                   onChange={onChange}
//                   value={url}
//                 />
//               </label>
//               <label className={styles.uploadPart}>
//                 <p className={styles.name}>날짜</p>
//                 <input
//                   name="date"
//                   type="date"
//                   onChange={onChange}
//                   value={date}
//                 />
//               </label>
//               <label className={styles.uploadPart}>
//                 <p className={styles.name}>제목</p>
//                 <input
//                   name="title"
//                   type="text"
//                   value={title}
//                   onChange={onChange}
//                   placeholder="제목"
//                 />
//               </label>
//               <label className={styles.uploadPart}>
//                 <p className={styles.name}>개발자</p>
//                 <input
//                   type="text"
//                   name="developer"
//                   value={dev}
//                   onChange={onChange}
//                 />
//               </label>
//               <label className={styles.uploadPart}>
//                 <p className={styles.name}>이미지</p>
//                 <input
//                   name="img"
//                   type="file"
//                   onChange={onChange}
//                   placeholder="이미지"
//                   accept="image/*"
//                 />
//               </label>
//               {img ? <img src={img} alt="" /> : null}
//               <label className={styles.uploadPart}>
//                 <p className={styles.name}>언어</p>
//                 <input
//                   name="language"
//                   type="text"
//                   value={language}
//                   onChange={onChange}
//                   placeholder="언어"
//                 />
//               </label>
//               <label className={styles.uploadPart}>
//                 <textarea
//                   name="description"
//                   value={description}
//                   onChange={onChange}
//                   placeholder="본문"
//                 />
//               </label>
//               <button type="submit">업로드</button>
//             </form>
//           </div>
//           {/*
//            *
//            *
//            * 정보 게시글 업로드
//            *
//            *
//            * */}
//           <div>
//             <h3 className="title">정보 게시글 업로드</h3>
//             <form onSubmit={infoUpload} method="POST" className="form">
//               <label className={styles.uploadPart}>
//                 <p className={styles.name}>날짜</p>
//                 <input
//                   name="date"
//                   type="date"
//                   onChange={onChange}
//                   value={date}
//                 />
//               </label>
//               <label className={styles.uploadPart}>
//                 <p className={styles.name}>제목</p>
//                 <input
//                   name="title"
//                   type="text"
//                   value={title}
//                   onChange={onChange}
//                   placeholder="제목"
//                 />
//               </label>
//               <label className={styles.uploadPart}>
//                 <textarea
//                   name="description"
//                   value={description}
//                   onChange={onChange}
//                   placeholder="본문"
//                 />
//               </label>
//               <button type="submit">업로드</button>
//             </form>
//           </div>
//         </article>
//       </main>
//     </>
//   );
// };

type Input = ChangeEvent<HTMLInputElement>;
type TextArea = ChangeEvent<HTMLTextAreaElement>;

export default function FileUploader() {
  const dateVal = new Date();
  // 이미지
  const [url, setUrl] = useState<string>('');
  const [date, setDate] = useState<string>(
    `${dateVal.getFullYear()}-${(dateVal.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateVal.getDate().toString().padStart(2, '0')}`
  );
  const [title, setTitle] = useState<string>('');
  const [dev, setDev] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('/images/placeholder-image.png');
  const [imageFile, setImageFile] = useState<File>();
  const [language, setLanguage] = useState<string[]>([]);
  const [description, setDescription] = useState<string>();

  // 이미지 업로드
  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    // 파일이 없을 경우
    if (!fileInput.files) {
      console.warn('선택된 파일이 없습니다');
      return;
    }

    // 파일의 값이 없는 경우
    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn('파일 목록이 비어 있습니다');
      return;
    }
    setImageFile(fileInput.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = (e: any) => {
      if (reader.readyState === 2) {
        setImageUrl(e.target.result);
      }
    };
    /** Reset file input */
    e.target.type = 'text';
    e.target.type = 'file';
  };

  // 프로젝트 업로드
  const uploadForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼 데이터 입력
    const formData = new FormData();
    formData.append('url', url);
    formData.append('date', date);
    formData.append('title', title);
    formData.append('developer', String(dev));
    formData.append('file', imageFile);
    formData.append('language', String(language));
    formData.append('description', description);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/upload`, {
        method: 'POST',
        body: formData,
      });
      console.log('res: ', res);

      if (!res.ok) {
        console.error('something went wrong, check your console.');
        return;
      }

      const data: { portfolio: string } = await res.json();
      console.log('data: ', data);

      // setImageUrl(data.fileUrl);
    } catch (error) {
      console.error('something went wrong, check your console.');
    }
  };

  return (
    <form className={styles.uploadForm} onSubmit={uploadForm}>
      <div>
        <label className={styles.uploadPart}>
          <p className={styles.name}>날짜</p>
          <input
            name="date"
            type="date"
            onChange={(e: Input) => setDate(e.target.value)}
            value={date}
          />
        </label>
        <label className={styles.uploadPart}>
          <p className={styles.name}>제목</p>
          <input
            name="title"
            type="text"
            value={title}
            onChange={(e: Input) => setTitle(e.target.value)}
            placeholder="제목"
          />
        </label>
        <label className={styles.uploadPart}>
          <p className={styles.name}>개발자</p>
          <input
            type="text"
            name="developer"
            value={dev}
            onChange={(e: Input) => setDev([e.target.value])}
            placeholder="개발자"
          />
        </label>
      </div>
      <label
        className={styles['file-uploader']}
        style={{ paddingTop: `calc(100% * (${446} / ${720}))` }}
      >
        <Image
          src={imageUrl}
          alt="uploaded image"
          width={720}
          height={446}
          priority={true}
        />
        <input
          style={{ display: 'none' }}
          type="file"
          onChange={onImageFileChange}
        />
      </label>
      <label className={styles.uploadPart}>
        <textarea
          name="description"
          value={description}
          onChange={(e: TextArea) => setDescription(e.target.value)}
          placeholder="본문"
        />
      </label>
      <label className={styles.uploadPart}>
        <p className={styles.name}>언어</p>
        <input
          name="language"
          type="text"
          value={language}
          onChange={(e: Input) => setLanguage([e.target.value])}
          placeholder="언어"
        />
      </label>
      <label className={styles.uploadPart}>
        <p className={styles.name}>프로젝트 주소</p>
        <input
          name="url"
          type="url"
          onChange={(e: Input) => setUrl(e.target.value)}
          value={url}
        />
      </label>
      <button type="submit">업로드</button>
    </form>
  );
}
