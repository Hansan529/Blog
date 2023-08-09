import Link from 'next/link';
import { api } from '../../axios';
import Image from 'next/image';
import styles from './Portfolio.module.scss';

const Portfolio = async () => {
  const {
    data: { portfolio },
  } = await api.get('/portfolio');
  return (
    <article className={styles.portfolios}>
      {portfolio.map((item) => (
        <div
          className={styles.portfolio_wrap}
          title={item.title}
          key={item._id}
        >
          <Link href={`/portfolio/${item._id}`}>
            <h3>{item.title}</h3>
            <small>{item.date}</small>
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
