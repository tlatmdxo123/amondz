import { all } from "redux-saga/effects";
import { productSaga } from "./Products";

export default function* rootSaga() {
  yield all([productSaga()]);
}
