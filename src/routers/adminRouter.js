import express from "express";
import { getUploadProject } from "../controllers/adminControllers";

const adminRouter = express.Router();

adminRouter.get("/upload/project", getUploadProject);

export default adminRouter;
