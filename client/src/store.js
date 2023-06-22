import Redux from "redux";
import { createStore } from "redux";
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  login: false,
};

function reducer(state = initialState, action) {
  let newState = { ...state };
  if (action.type === "LOGIN") {
    newState.login = action.logged;
  }
  return newState;
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
