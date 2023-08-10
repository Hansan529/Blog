import { ReduxProvider } from './redux/provider';
import Header from './components/Header';
import './globals.scss';
import { Metadata } from 'next';
import { connectMongoDB } from '../utils/database';
import Footer from './components/Footer';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  generator: 'Next.js',
  applicationName: 'Next.js',
  creator: 'Hansan',
  colorScheme: 'dark',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Hxan Portfolio',
    description: '포트폴리오 랜딩페이지',
    url: 'https://hxan.net',
    siteName: 'Hxan Developer Blog',
    images: '/images/og-image.png',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default async function RootLayout({ children }: Props) {
  await connectMongoDB();
  return (
    <html>
      <body>
        <ReduxProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
