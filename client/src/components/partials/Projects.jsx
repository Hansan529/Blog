import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/partials/css/Projects.module.css';
import Project from '../mixins/Project';
import Loading from '../config/Loading';

function Projects() {
  const logged = useSelector((state) => state.info.logged);
  const project = useSelector((state) => state.project.value);
  const devAvatar = useSelector((state) => state.fetchData.devAvatar);
  const [loading, setLoading] = useState(true);
  const projectRef = useRef();

  useEffect(() => {
    if (devAvatar) {
      setLoading(false);
    }
  }, [devAvatar]);

  return (
    <>
      <article className={styles.grid}>
        <div ref={projectRef} id="project" className="part"></div>
        {loading ? (
          <Loading />
        ) : (
          project.map((data) => {
            return (
              <Project
                key={data._id}
                id={data._id}
                logged={logged}
                date={data.date}
                title={data.title}
                developer={data.developer}
                thumbnail={data.thumbnail}
                language={data.language}
              />
            );
          })
        )}
      </article>
    </>
  );
}

export default Projects;
