import express from 'express';
import {
  getHome,
  getImage,
  postJoin,
  postLogin,
  postProjectEdit,
  postUpload,
} from '../controllers/apiController';
import multer from 'multer';

const apiRouter = express.Router();

// 업로드 multer 미들웨어
const upload = multer({
  dest: 'uploads/projects',
  limits: { fileSize: 5 * 1024 * 1024 },
});

apiRouter.get('/', getHome);
apiRouter.post('/login', postLogin);
apiRouter.route('/join').post(postJoin);
apiRouter.post('/upload', upload.single('img'), postUpload);
apiRouter.post('/project/:id/edit', upload.single('img'), postProjectEdit);
// apiRouter.get('/image/:id', getImage);

export default apiRouter;
