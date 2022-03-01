import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../types/product";
import { fetchAdd, fetchEdit, fetchRemove } from "./api";
import { all, call, getContext, put, takeEvery } from "redux-saga/effects";
import {
  addProduct,
  addProductError,
  addProductSuccess,
  editProduct,
  editProductError,
  editProductSuccess,
  EditRequest,
  removeProduct,
  removeProductSuccess,
} from ".";
import { AxiosResponse } from "axios";
import { BrowserHistory } from "history";

function* fetchAddProduct(action: PayloadAction<FormData>) {
  try {
    const res: AxiosResponse<Product> = yield call(fetchAdd, action.payload);
    yield put(addProductSuccess(res.data));
  } catch (error) {
    yield put(addProductError((error as Error).message));
  }
}

function* fetchEditProduct(action: PayloadAction<EditRequest>) {
  try {
    const res: AxiosResponse<Product> = yield call(fetchEdit, action.payload);
    yield put(editProductSuccess(res.data));
  } catch (error) {
    yield put(editProductError((error as Error).message));
  }
}

function* fetchRemoveProduct(action: PayloadAction<string>) {
  try {
    yield call(fetchRemove, action.payload);
    yield put(removeProductSuccess(action.payload));
  } catch (error) {
    yield put(addProductError((error as Error).message));
  }
}

function* watchAddProduct() {
  yield takeEvery(addProduct.type, fetchAddProduct);
}

function* watchRemoveProduct() {
  yield takeEvery(removeProduct.type, fetchRemoveProduct);
}

function* watchEditProduct() {
  yield takeEvery(editProduct.type, fetchEditProduct);
}

export function* productSaga() {
  yield all([watchAddProduct(), watchRemoveProduct(), watchEditProduct()]);
}
