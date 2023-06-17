import mongoose from "mongoose";

mongoose.connect(process.env.MONGOOSE_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅");
const handleError = () => console.log("❌");

db.once("open", handleOpen);
db.on("error", handleError);
