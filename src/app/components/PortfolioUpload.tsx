'use client';

// Function
import styles from './PortfolioUpload.module.scss';

// Package
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { formApi } from '../../axios';
import { useRouter } from 'next/navigation';

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
      const res = await formApi.post(`/upload`, formData);
      console.log('res: ', res);

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
