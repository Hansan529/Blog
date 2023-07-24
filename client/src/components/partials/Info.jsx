// Components

// Functions
import styles from '../../styles/partials/css/Info.module.css';

// Packages
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function Info({ LinkInfo }) {
  const infoRef = useRef();
  const info = useSelector((state) => state.db.info);

  // * infoRef가 선택되면, 해당 Ref를 부모 컴포넌트로 전달
  useEffect(() => {
    if (infoRef) {
      infoRef.current.focus();
      LinkInfo(infoRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoRef]);

  return (
    <article className={styles.article}>
      <div ref={infoRef} id="info" className="part"></div>
      <h2>Info</h2>
      <div className={styles.infoWrap}>
        {info.map((item, index) => (
          <div className={styles.info} key={index}>
            <h3>{item.title}</h3>
            <small>{item.date.slice(0, 10)}</small>
          </div>
        ))}
      </div>
    </article>
  );
}

export default Info;
