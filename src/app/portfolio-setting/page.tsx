import FileUploader from '../components/PortfolioUpload';
import styles from './page.module.scss';

const PortfolioSetting = () => {
  return (
    <article className={styles.center}>
      <FileUploader />
    </article>
  );
};

export default PortfolioSetting;
