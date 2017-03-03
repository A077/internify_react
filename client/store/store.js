import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import { logger } from 'middleware';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';

function configure() {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore;

  const createStoreWithMiddleware = applyMiddleware(
      logger,
      thunk
  )(create);

  const store = createStoreWithMiddleware(rootReducer, void(0), autoRehydrate());

  persistStore(store);
  return store;
}

export const store = configure();
