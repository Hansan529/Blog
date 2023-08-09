import FileUploader from '../components/FileUploader';
import styles from './page.module.scss';
import PortfolioEdit from '../components/PortfolioEdit';

const PortfolioSetting = () => {
  return (
    <article className={styles.center}>
      <FileUploader />
      <PortfolioEdit />
    </article>
  );
};

export default PortfolioSetting;
