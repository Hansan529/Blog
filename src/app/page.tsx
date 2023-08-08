import { api } from '../axios';
import Portfolio from './components/Portfolio';
import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const data = [
    'html',
    'css',
    'sass',
    'js',
    'react',
    'redux',
    'nodejs',
    'express',
    'mongodb',
    'git',
    'github',
    'docker',
    'typescript',
    'nextjs',
    'mysql',
  ];

  return (
    <>
      <article className={styles.article}>
        <div id="homepage" className="part"></div>
        <h2 className={styles.title}>Hxan Portfolio</h2>
        <p>프론트엔드 개발자가 되기 위해서 다양한 언어를 공부중입니다</p>
        <p>현재 사용 가능한 언어 및 라이브러리, 툴은 다음과 같습니다</p>
        <div className={styles.language}>
          {data.map((lang, index) => (
            <div key={index} title={lang}>
              <Image
                src={`/${lang}-icon.svg`}
                alt={lang}
                width={30}
                height={30}
              />
              <span>{lang}</span>
            </div>
          ))}
        </div>
      </article>
      <Portfolio />
    </>
  );
}
