/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import category from '@Reducers/category';
import home from '@Reducers/home';
import topic from '@Reducers/topic';
import author from '@Reducers/author';
import account from '@Reducers/account';
import search from '@Reducers/search';
import ui from '@Reducers/ui';
import toast from '@Reducers/toast';

const combinedReducer = combineReducers({
  category,
  home,
  topic,
  author,
  account,
  search,
  ui,
  toast,
});


const makeStore = initialState => {
  const pageProps = initialState || fromJS({});
  const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(combinedReducer, pageProps, composeEnhancers(applyMiddleware(thunkMiddleware)));
};

export default makeStore;
