// Components
import Header from '../partials/Header';
import Footer from '../partials/Footer';

// Function
import { useParams } from 'react-router-dom';

// Package

function DetailProject() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <img src={`${process.env.REACT_APP_SERVER}/image/${id}`} alt="" />
      <Footer />
    </>
  );
}

export default DetailProject;
