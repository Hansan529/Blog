import Portfolio from './components/Portfolio';
import Introduce from './components/Introduce';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hxan FrontEnd Blog',
  description: '프로젝트 및 개발 정보',
};

export default async function Home() {
  return (
    <>
      <Introduce />
      <Portfolio edit={false} />
    </>
  );
}
