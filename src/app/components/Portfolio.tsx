import Link from 'next/link';
import { api } from '../../axios';
import Image from 'next/image';
import styles from './Portfolio.module.scss';

interface Portfolio {
  _id: string;
  title: string;
  date: string;
  imageUrl: string;
}

const Portfolio = async ({ edit }) => {
  const {
    data: { portfolio },
  } = await api.get('/portfolio');
  return (
    <article className={styles.portfolios}>
      {portfolio.map((item: Portfolio) => (
        <div
          className={styles.portfolio_wrap}
          title={item.title}
          key={item._id}
        >
          <Link href={`portfolio${edit ? '-setting' : ''}/${item._id}`}>
            <h3>{item.title}</h3>
            <small className={styles.date}>{item.date}</small>
            <Image
              className={styles.portfolioImg}
              src={item.imageUrl}
              alt={item.title}
              width={400}
              height={225}
            />
          </Link>
        </div>
      ))}
      <small></small>
    </article>
  );
};

export default Portfolio;
