import Portfolio from './components/Portfolio';
import Introduce from './components/Introduce';
import { Metadata } from 'next';

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  creator: 'Hansan',
  colorScheme: 'dark',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default async function Home() {
  return (
    <>
      <Introduce />
      <Portfolio edit={false} />
    </>
  );
}
