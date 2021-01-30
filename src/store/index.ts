import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
const thunkMiddlware = [thunk];
import appReducer from './reducers/app';
import errorReducer from "./reducers/error";
import userReducer from "./reducers/user";

const initialState = {};

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    error: errorReducer
})

export type AppState = ReturnType<typeof rootReducer>;
const store = createStore(rootReducer, initialState, applyMiddleware(...thunkMiddlware) );

export default store;
