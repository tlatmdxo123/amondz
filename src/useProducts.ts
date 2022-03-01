import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { SERVER_URL } from "./constants";

export const useProducts = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch(SERVER_URL + "/products").then((res) =>
          res.json()
        );
        setProducts(res);
      } catch (error) {
        setError((error as Error).message);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return { isLoading, error, products };
};
