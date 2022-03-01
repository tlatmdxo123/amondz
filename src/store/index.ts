import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { products } from "./Products";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const serializeMiddleware = {
  serializableCheck: {
    // Ignore these action types
    ignoredActions: ["products/editProduct", "products/addProduct"],
  },
};

export const store = configureStore({
  reducer: {
    products,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(serializeMiddleware).concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
