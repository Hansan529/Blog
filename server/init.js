require("dotenv/config");
require("./db");
import app from "./server";

const PORT = 4001;

const Listen = () => {
  console.log(`:${PORT} Listen`);
};

app.listen(PORT, Listen);
