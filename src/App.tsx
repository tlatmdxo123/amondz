import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { useAppDispatch } from "./hooks";
import { ProductAdd } from "./ProductAdd";
import ProductDetail from "./ProductDetail/ProductDetail";
import { Error } from "./shared/Error";
import { Loading } from "./shared/Loading";
import { addProducts } from "./store/Products";
import { useProducts } from "./useProducts";

function App() {
  const { isLoading, error, products } = useProducts();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products.length > 0) dispatch(addProducts(products));
  }, [products]);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product-add" element={<ProductAdd />}>
          <Route path=":id" element={<ProductAdd />} />
        </Route>
        <Route path="product-detail">
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
