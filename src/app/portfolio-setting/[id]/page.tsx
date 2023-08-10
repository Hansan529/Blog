import { NextRequest } from 'next/server';
import { api } from '../../../axios';
import FileUploader from '../../components/FileUploader';
import styles from '../page.module.scss';

interface Request extends NextRequest {
  params: {
    id: string;
  };
}

const PortfolioSetting = async (req) => {
  const id = req.params.id;
  const { data } = await api.get(`/portfolio/${id}`);
  return (
    <article className={styles.center}>
      <FileUploader
        ogId={id}
        ogEdit={true}
        ogUrl={data.url}
        ogDate={data.date}
        ogTitle={data.title}
        ogDev={data.developer}
        ogImageUrl={data.imageUrl}
        ogLanguage={data.language}
        ogDescription={data.description}
      />
    </article>
  );
};

export default PortfolioSetting;
