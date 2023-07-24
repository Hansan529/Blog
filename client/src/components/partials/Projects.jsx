// Components
import Loading from '../config/Loading';
import Project from '../mixins/Project';

// Functions
import styles from '../../styles/partials/css/Projects.module.css';

// Packages
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

function Projects({ LinkProject }) {
  const logged = useSelector((state) => state.info.logged);
  const project = useSelector((state) => state.db.project);
  const devAvatar = useSelector((state) => state.fetchData.devAvatar);
  const [loading, setLoading] = useState(true);
  const projectRef = useRef();

  // * 개발자 이미지 로드 대기
  useEffect(() => {
    if (devAvatar) {
      setLoading(false);
    }
  }, [devAvatar]);

  // * projectRef가 선택되면, 해당 Ref를 부모 컴포넌트로 전달
  useEffect(() => {
    if (projectRef) {
      projectRef.current.focus();
      LinkProject(projectRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectRef]);

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
