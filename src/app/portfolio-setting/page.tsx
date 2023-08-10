import FileUploader from '../components/FileUploader';
import styles from './page.module.scss';
import Portfolio from '../components/Portfolio';

const PortfolioSetting = () => {
  return (
    <article className={styles.center}>
      <FileUploader
        ogId={null}
        ogEdit={false}
        ogUrl={null}
        ogDate={null}
        ogTitle={null}
        ogDev={null}
        ogImageUrl={null}
        ogLanguage={null}
        ogDescription={null}
      />
      <Portfolio edit={true} />
    </article>
  );
};

export default PortfolioSetting;
