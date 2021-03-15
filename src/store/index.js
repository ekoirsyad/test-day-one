import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

const configureStore = (initialState = {}) => {
  return createStore(reducers, initialState, applyMiddleware(reduxThunk));
};
const store = configureStore({});

export default store;
