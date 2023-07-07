import styles from '../../styles/config/css/Loading.module.css';
import Footer from '../partials/Footer';
import Header from '../partials/Header';

function Loading() {
  return (
    <>
      <div className={styles.background}>
        <p className={styles.Loading}>로딩 중입니다...</p>
        <img
          src={`${process.env.PUBLIC_URL}/images/ico/loading.svg`}
          alt="로딩중"
        />
      </div>
    </>
  );
}

export default Loading;
