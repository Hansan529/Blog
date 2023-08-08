import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <>
      <div className={styles.background}>
        <p className={styles.Loading}>로딩 중입니다...</p>
        <img src="/loading.svg" alt="로딩중" />
      </div>
    </>
  );
};

export default Loading;
