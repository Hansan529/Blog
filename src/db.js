import mongoose from "mongoose";
import { DB_URL } from "./data";

mongoose.connect(DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ DB 연결 정상");
const handleError = (error) => console.log("❌ DB 연결 오류: ", error);

db.on("error", handleError);
db.once("open", handleOpen);
