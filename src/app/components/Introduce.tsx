import Image from 'next/image';
import styles from './Introduce.module.scss';

const Introduce = () => {
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
    'ts',
    'nextjs',
    'mysql',
  ];

  return (
    <article className={styles.article}>
      <div id="homepage" className="part"></div>
      <h2 className={styles.title}>hxan frontend blog</h2>
      <p>프론트엔드 개발자가 되기 위해서 다양한 언어를 공부중입니다</p>
      <p>현재 사용 가능한 언어 및 라이브러리, 툴은 다음과 같습니다</p>
      <div className={styles.language}>
        {data.map((lang, index) => (
          <div key={index} title={lang}>
            <Image
              src={`/images/ico/language/${lang}-icon.svg`}
              alt={lang}
              width={30}
              height={30}
            />
            <span>{lang}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Introduce;
