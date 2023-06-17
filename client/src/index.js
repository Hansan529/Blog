const React = require("react");
const ReactDOM = require("react-dom/client");
const App = require("./Router/App");
require("./view/config/reset.css");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
