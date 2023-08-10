'use client';

// Function
import styles from './FileUploader.module.scss';

// Package
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { formApi } from '../../axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type Input = ChangeEvent<HTMLInputElement>;
type TextArea = ChangeEvent<HTMLTextAreaElement>;

interface params {
  ogId: string | null;
  ogEdit: boolean;
  ogUrl: string | null;
  ogDate: string | null;
  ogTitle: string | null;
  ogDev: string[] | null;
  ogImageUrl: string | null;
  ogLanguage: string[] | null;
  ogDescription: string | null;
}

export default function FileUploader({
  ogId,
  ogEdit,
  ogUrl,
  ogDate,
  ogTitle,
  ogDev,
  ogImageUrl,
  ogLanguage,
  ogDescription,
}: params) {
  const login = useSelector((state: RootState) => state.auth.value.isAuth);
  const dateVal = new Date();
  // 이미지
  const [url, setUrl] = useState<string>(ogUrl || '');
  const [date, setDate] = useState<string>(
    ogDate ||
      `${dateVal.getFullYear()}-${(dateVal.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${dateVal.getDate().toString().padStart(2, '0')}`
  );
  const [title, setTitle] = useState<string>(ogTitle || '');
  console.log('title: ', title);
  console.log('ogTitle: ', ogTitle);
  const [dev, setDev] = useState<string[]>(ogDev || []);
  const [imageUrl, setImageUrl] = useState(
    ogImageUrl || '/images/placeholder-image.png'
  );
  const [imageFile, setImageFile] = useState<File>();
  const [language, setLanguage] = useState<string[]>(ogLanguage || []);
  const [description, setDescription] = useState<string>(ogDescription || '');
  const router = useRouter();
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

  // 프로젝트 업로드 및 업데이트
  const uploadAndPatchForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼 데이터 입력
    const formData = new FormData();
    formData.append('url', url);
    formData.append('date', date);
    formData.append('title', title);
    formData.append('developer', String(dev));
    formData.append('language', String(language));
    formData.append('description', description);
    if (ogEdit) {
      formData.append('_id', ogId);
      formData.append('imageUrl', ogImageUrl);
      if (imageFile) formData.append('file', imageFile);
    } else {
      formData.append('file', imageFile);
    }
    // 포트폴리오 수정
    if (ogEdit) {
      try {
        await formApi.patch('/portfolio', formData);
        router.push('/portfolio-setting');
        router.refresh();
        return;
      } catch (error) {
        console.error('포트폴리오 업로드 중 문제가 생겼습니다.', error);
        return;
      }
    }
    try {
      const res = await formApi.post(`/portfolio`, formData);

      if (res.status !== 200) {
        console.error('something went wrong, check your console.');
        return;
      }

      const data: { portfolio: string } = await res.data;
      router.push(`/portfolio/${data.portfolio}`);
    } catch (error) {
      console.error('something went wrong, check your console.');
    }
  };

  // 로그인하지 않았다면 접근 불가능
  useEffect(() => {
    if (login) return;
    router.push('/login');
  }, [login]);

  return (
    <form className={styles.uploadForm} onSubmit={uploadAndPatchForm}>
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
          // priority={true}
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
