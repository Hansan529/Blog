import { useParams } from 'react-router-dom';

function DetailProject() {
  const { id } = useParams();
  return (
    <>
      <img src={`${process.env.REACT_APP_SERVER}/image/${id}`} alt="" />
    </>
  );
}

export default DetailProject;
