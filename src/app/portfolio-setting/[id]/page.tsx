import { NextRequest } from 'next/server';
import { api } from '../../../axios';
import FileUploader from '../../components/FileUploader';
import axios from 'axios';

interface Request extends NextRequest {
  params: {
    id: string;
  };
}

const PortfolioSetting = async (req: Request) => {
  const id = req.params.id;
  const { data } = await api.get(`/portfolio/${id}`);
  return (
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
  );
};

export default PortfolioSetting;
