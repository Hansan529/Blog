require("dotenv/config");
require("./db");
const app = require("./server");

const PORT = 4001;

const Listen = () => {
  console.log(`:${PORT} Listen`);
};

app.listen(PORT, Listen);
