import express from "express";
import {
  getUploadProject,
  postUploadProject,
} from "../controllers/adminControllers";

const adminRouter = express.Router();

adminRouter
  .route("/upload/project")
  .get(getUploadProject)
  .post(postUploadProject);

export default adminRouter;
