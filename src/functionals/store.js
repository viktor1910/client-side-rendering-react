import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware({
  onError(error) {
    Sentry.captureException(error.err);
  },
});

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
  let store;

  //   const isClient = typeof window !== "undefined";
  //   if (isClient) {
  //     const cookie = require("js-cookie");
  //     const { CookieStorage } = require("redux-persist-cookie-storage");
  //     const { isLoggedIn } = require("../utils/authority");
  //     const persistedReducer = persistReducer(
  //       {
  //         key: "root",
  //         storage: new CookieStorage(cookie, {
  //           expiration: {
  //             default: 1, // Session cookies used by default
  //           },
  //         }),
  //         whitelist: ["authReducer"],
  //         stateReconciler: (inboundState, originalState) => {
  //           const newInboundState = { ...inboundState };

  //           // persist authReducer only if token is still valid
  //           if (!isLoggedIn()) delete newInboundState.authReducer;

  //           return { ...originalState, ...newInboundState };
  //         },
  //       },
  //       rootReducer
  //     );
  //     store = createStore(
  //       persistedReducer,
  //       initialState,
  //       bindMiddleware([sagaMiddleware])
  //     );
  //     store.__PERSISTOR = persistStore(store);
  //   } else {
  store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();
  return store;
}

export default configureStore;
