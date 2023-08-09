import styles from './Loading.module.scss';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className={styles.loadingWrap}>
      <div className={styles.background}>
        <p className={styles.loading}>로딩 중입니다...</p>
        <Image
          className={styles.loading_img}
          src="/images/loading.svg"
          alt="로딩중"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default Loading;
