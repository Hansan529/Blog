// React 설정
import React from "react";
import ReactDOM from "react-dom/client";

// Redux 설정
import { Provider } from "react-redux";
import store from "./store";

// 스타일시트
import "./view/config/reset.css";

// 컴포넌트 호출
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
