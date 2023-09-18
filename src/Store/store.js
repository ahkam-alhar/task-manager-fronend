import { applyMiddleware, legacy_createStore } from "redux";
import taskReducer from "../reducers/task-reducers";
import thunk from "redux-thunk";

const store = legacy_createStore(taskReducer, applyMiddleware(thunk));

export default store;