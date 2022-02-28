import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Product } from "../../../types/product";

type ProductsState = Product[];

const initialState: ProductsState = [];

export const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product[]>) => {
      state.push(...action.payload);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    editProduct: (state, action: PayloadAction<Product>) => {
      state = state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state = state.filter((product) => product.id !== action.payload);
    },
  },
});
export const selectProducts = (state: RootState) => state.products;
export const selectProduct = (id: string) => (state: RootState) =>
  state.products.find((product) => product.id === id);
export const products = slice.reducer;
export const { addProducts, addProduct, removeProduct, editProduct } =
  slice.actions;
