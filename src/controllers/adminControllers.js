import Project from "../models/Project";

export const getUploadProject = (req, res) => {
  const { errorMessage } = req.session;
  delete req.session.errorMessage;
  return res.render("upload", { errorMessage });
};

export const postUploadProject = async (req, res) => {
  const {
    body: { url, name, date, thumbnail, languages, description },
  } = req;
  console.log(date);
  try {
    await Project.create({
      url,
      name,
      date,
      dateSearch: date,
      thumbnail,
      languages: Project.formatLanguage(languages),
      description,
    });
  } catch (error) {
    return res.status(400).render("upload", {
      errorMessage: "조건에 맞지 않은 정보를 입력하여 등록을 실패했습니다.",
    });
  }
  return res.redirect("/");
};
