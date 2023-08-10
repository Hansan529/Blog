'use client';

// Function
import styles from './FileUploader.module.scss';

// Package
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { formApi, api } from '../../axios';
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
  // 로그인 체크
  const login = useSelector((state: RootState) => state.auth.value.isAuth);

  // Input 값 State
  const dateVal = new Date();
  const [url, setUrl] = useState<string>(ogUrl || '');
  const [date, setDate] = useState<string>(
    ogDate ||
      `${dateVal.getFullYear()}-${(dateVal.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${dateVal.getDate().toString().padStart(2, '0')}`
  );
  const [title, setTitle] = useState<string>(ogTitle || '');
  const [dev, setDev] = useState<string[]>(ogDev || []);
  const [imageUrl, setImageUrl] = useState(
    ogImageUrl || '/images/placeholder-image.png'
  );
  const [imageFile, setImageFile] = useState<File>();
  const [language, setLanguage] = useState<string[]>(ogLanguage || []);
  const [description, setDescription] = useState<string>(ogDescription || '');

  // 페이지 이동 라우터
  const router = useRouter();

  // 포트폴리오 삭제 체크
  const [removeChk, setRemoveChk] = useState<boolean>(false);
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

  // 포트폴리오 삭제 요청
  const removePortfolio = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { status } = await (
      await api.delete(`/portfolio/${ogId}`, {
        data: {
          ogImageUrl,
        },
      })
    ).data;

    if (status === 200) router.push('/portfolio-setting');
    router.refresh();
  };

  // 로그인하지 않았다면 접근 불가능
  useEffect(() => {
    if (login) return;
    router.push('/login');
  }, [login]);

  return (
    <>
      <form className={styles.uploadForm} onSubmit={uploadAndPatchForm}>
        <div className={styles.portfolio__info}>
          <input
            name="date"
            type="date"
            onChange={(e: Input) => setDate(e.target.value)}
            value={date}
            required
          />
          <input
            className={styles.portfolio__infoTitle}
            name="title"
            type="text"
            value={title}
            onChange={(e: Input) => setTitle(e.target.value)}
            placeholder="제목"
            required
          />
          <input
            type="text"
            name="developer"
            value={dev}
            onChange={(e: Input) => setDev([e.target.value])}
            placeholder="개발자"
            required
          />
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
            accept="image/*"
            onChange={onImageFileChange}
          />
        </label>
        <textarea
          className={styles.description}
          name="description"
          value={description}
          onChange={(e: TextArea) => setDescription(e.target.value)}
          required
          placeholder="본문"
        />
        <div className={styles.portfolio__etc}>
          <input
            className={styles.language}
            name="language"
            type="text"
            value={language}
            onChange={(e: Input) => setLanguage([e.target.value])}
            required
            placeholder="언어"
          />
          <input
            className={styles.url}
            name="url"
            type="url"
            onChange={(e: Input) => setUrl(e.target.value)}
            value={url}
            required
            placeholder="프로젝트 주소"
          />
        </div>
        <button className={styles.uploadBtn} type="submit">
          {ogEdit ? '업데이트' : '업로드'}
        </button>
        {ogEdit ? (
          <button
            className={styles.removeBtn}
            onClick={() => setRemoveChk(true)}
            type="button"
          >
            삭제하기
          </button>
        ) : null}
      </form>
      {removeChk ? (
        <article className={styles.removeBg}>
          <div className={styles.removeEl}>
            <h2>포트폴리오 삭제</h2>
            <p>정말로 삭제하시려는게 맞습니까?</p>
            <div>
              <input type="button" value="예" onClick={removePortfolio} />
              <input
                type="button"
                value="아니오"
                onClick={() => setRemoveChk(false)}
              />
            </div>
          </div>
        </article>
      ) : null}
    </>
  );
}
