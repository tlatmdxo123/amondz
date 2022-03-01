import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Product } from "../../../types/product";

type ProductsState = {
  data: Product[];
  error: string | null;
};
export type EditRequest = {
  id: string;
  data: FormData;
};

const initialState: ProductsState = {
  data: [],
  error: null,
};

export const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.data.push(...action.payload);
    },
    addProduct: (state, action: PayloadAction<FormData>) => {},
    addProductSuccess: (state, action: PayloadAction<Product>) => {
      state.data.push(action.payload);
    },
    addProductError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    editProduct: (state, action: PayloadAction<EditRequest>) => {},
    editProductSuccess: (state, action: PayloadAction<Product>) => {
      state.data = state.data.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    editProductError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    removeProduct: (state, action: PayloadAction<string>) => {},
    removeProductSuccess: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(
        (product) => product.id !== action.payload
      );
    },
    removeProductError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});
export const selectProducts = (state: RootState) => state.products.data;
export const selectProduct = (id: string) => (state: RootState) =>
  state.products.data.find((product) => product.id === id);
export const products = slice.reducer;
export const {
  addProducts,
  addProduct,
  addProductSuccess,
  addProductError,
  removeProduct,
  removeProductSuccess,
  removeProductError,
  editProduct,
  editProductSuccess,
  editProductError,
} = slice.actions;
