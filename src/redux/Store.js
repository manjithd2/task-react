import { createStore } from 'redux';
import reducer from './Reducer';

const initialstate = { };
const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

const store = createStore(reducer, initialstate,enableReduxDevTools)

export default store