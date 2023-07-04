import express from 'express';
import {
  getHome,
  postJoin,
  postLogin,
  postLoginGithub,
  tokenLoginGithub,
  postProjectDelete,
  postProjectEdit,
  postUpload,
} from '../controllers/apiController';
import multer from 'multer';

const apiRouter = express.Router();

// 업로드 multer 미들웨어
const projectImg = multer({
  dest: 'uploads/projects',
  limits: { fileSize: 5 * 1024 * 1024 },
});

apiRouter.get('/', getHome);
apiRouter.post('/login', postLogin);
apiRouter.get('/login/github/token', tokenLoginGithub);
apiRouter.post('/login/github/access', postLoginGithub);
apiRouter.route('/join').post(postJoin);
apiRouter.post('/upload', projectImg.single('img'), postUpload);
apiRouter.post('/project/:id/edit', projectImg.single('img'), postProjectEdit);
apiRouter.post('/project/:id/delete', postProjectDelete);
// apiRouter.get('/image/:id', getImage);

export default apiRouter;
