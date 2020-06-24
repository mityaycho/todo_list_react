import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';

import { applyMiddleware, createStore } from 'redux';


const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;