import React, { useState } from "react";

export default function useAllProducts() {
  const [carts, setCarts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCarts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }
      const data = await response.json();

      console.log("Полученные данные:", data.products);
      setCarts(data.products);
    } catch (err) {
      console.error("Ошибка:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { carts, loading, mutate: fetchCarts, error };
}
