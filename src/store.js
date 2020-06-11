/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux-immutable';

import category from '@Reducers/category';
import home from '@Reducers/home';
import { fromJS } from 'immutable';

const combinedReducer = combineReducers({
  category,
  home,
});


const makeStore = initialState => {
  const pageProps = initialState || fromJS({});
  const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(combinedReducer, pageProps, composeEnhancers(applyMiddleware(thunkMiddleware)));
};

export default makeStore;
