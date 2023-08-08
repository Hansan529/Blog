import Link from 'next/link';
import { api } from '../../axios';

const Portfolio = async () => {
  const {
    data: { portfolio },
  } = await api.get('/db/project');
  // console.log('project: ', project);
  return (
    <article>
      {portfolio.map((item) => (
        <div key={item._id}>
          <Link href={`/portfolio/${item._id}`}>
            {item.developer}
            <h2>{item.title}</h2>
            <small>{item.date}</small>
          </Link>
        </div>
      ))}
      <small></small>
    </article>
  );
};

export default Portfolio;
