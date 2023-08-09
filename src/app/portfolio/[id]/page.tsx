import Image from 'next/image';
import { api } from '../../../axios';
import styles from './page.module.scss';
import Link from 'next/link';

const PortfolioDetail = async (req) => {
  const id = req.params.id;
  const { data } = await api.get(`/portfolio/${id}`);
  return (
    <>
      <div className={styles.portfolio__body}>
        <div className={styles.date}>{data.date}</div>
        <h2 className={styles.title}>{data.title}</h2>
        <div className={styles.developer}>{data.developer}</div>
        <Link className={styles.url} href={data.url}>
          <Image
            className={styles.img}
            src={data.imageUrl}
            alt={data.title}
            width={1200}
            height={400}
          />
        </Link>
        <div>{data.langauge}</div>
        <pre className={styles.description}>{data.description}</pre>
      </div>
      <aside className={styles.portfolio__about}>
        <h2>About</h2>
        <Link href={data.url}>
          <i>link</i>
          <span>{data.url}</span>
        </Link>
        <hr />
        <h2 className={styles.language}>Languages</h2>
        {data.language.map((el: string, index: number) => (
          <div className={styles[`${el.trim()}`]} key={index}>
            {el.trim()}
          </div>
        ))}
      </aside>
    </>
  );
};

export default PortfolioDetail;
