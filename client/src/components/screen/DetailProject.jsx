// Components
import Header from '../partials/Header';
import Footer from '../partials/Footer';

// Function
import { server } from './Home';
import styles from '../../styles/screen/css/DetailProject.module.css';

// Package
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '../config/Loading';

function DetailProject() {
  const { id } = useParams();
  const [project, setProject] = useState('');
  const [loading, setLoading] = useState(true);

  const info = async () => {
    const data = await (await server.get(`/project/${id}`)).data;
    setProject(data);
    setLoading(false);
  };

  useEffect(() => {
    info();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <main>
            <h2>{project.title}</h2>
            <small>{project.date}</small>
            <p>{project.member}</p>
            <picture className={styles.picture}>
              <img
                src={`${process.env.REACT_APP_SERVER}/image/${project.img}`}
                alt="이미지"
              />
            </picture>
            <p>{project.language}</p>
            <pre>{project.body}</pre>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default DetailProject;
