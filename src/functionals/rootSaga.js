import { all } from "redux-saga/effects";
import es6promise from "es6-promise";

es6promise.polyfill();

function* rootSaga() {
  yield all([]);
}

export default rootSaga;
