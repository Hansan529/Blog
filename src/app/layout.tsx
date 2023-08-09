import { ReduxProvider } from './redux/provider';
import Header from './components/Header';
import './globals.scss';
import { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  colorScheme: 'dark',
  creator: 'Hansan',
  title: 'Hxan FrontEnd Blog',
  description: '프로젝트 및 개발 정보',
  openGraph: {
    images: '/og-image.png',
  },
};

export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body>
        <ReduxProvider>
          <Header />
          <main>{children}</main>
          <footer></footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
