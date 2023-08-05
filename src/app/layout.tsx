import { ReduxProvider } from './redux/provider';
import Header from './Header';
import './globals.scss';
import { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Hxan FrontEnd Blog',
  description: '프로젝트 및 개발 정보',
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
