function Project({ title, member, img, language }) {
  // fs.readdir();
  return (
    <div>
      <p>{title}</p>
      <p>{member}</p>
      <img src={`${process.env.REACT_APP_SERVER}/image/${img}`} alt="preview" />
      <p>{language}</p>
    </div>
  );
}

export default Project;
