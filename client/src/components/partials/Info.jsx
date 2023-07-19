import { useEffect, useRef } from 'react';

function Info({ LinkInfo }) {
  const infoRef = useRef();

  // * infoRef가 선택되면, 해당 Ref를 부모 컴포넌트로 전달
  useEffect(() => {
    if (infoRef) {
      infoRef.current.focus();
      LinkInfo(infoRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoRef]);

  return (
    <article>
      <div ref={infoRef} id="info" className="part"></div>
      <h2>Info</h2>
    </article>
  );
}

export default Info;
