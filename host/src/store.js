import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'

const staticReducers = {
  productsReducer: productsReducer,
};

export const store = configureStore({
  reducer: staticReducers,
});

store.asyncReducers = {};

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  });
}

store.injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};

