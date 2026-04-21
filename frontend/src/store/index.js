import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { jobsReducer } from './reducers';

export const store = createStore(jobsReducer, applyMiddleware(thunk));
