import React, { useState } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import useAllProducts from "../shared/Api/all-products";
import SearchBar from "../shared/components/SearchBar";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const { carts, loading, error } = useAllProducts();

  const filteredProducts = carts.filter(({ title }) =>
    title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const sortingOptions = {
      priceAsc: a.price - b.price,
      priceDesc: b.price - a.price,
      ratingAsc: a.rating - b.rating,
      ratingDesc: b.rating - a.rating,
    };
    return sortingOptions[sortType] || 0;
  });

  return (
    <div>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginBottom: 2 }}>
        <SearchBar value={search} onChange={setSearch} sx={{ flex: 1 }} />
        <select value={sortType} onChange={(e) => setSortType(e.target.value)} style={{ width: "200px", padding: "5px" }}>
          <option value="priceAsc">Цена (по возрастанию)</option>
          <option value="priceDesc">Цена (по убыванию)</option>
          <option value="ratingAsc">Рейтинг (по возрастанию)</option>
          <option value="ratingDesc">Рейтинг (по убыванию)</option>
        </select>
      </Box>
      {loading ? (
        <CircularProgress sx={{ margin: "20px 0" }} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : sortedProducts.length ? (
        <ProductGrid products={sortedProducts} />
      ) : (
        <Typography>Ничего не найдено</Typography>
      )}
    </div>
  );
};

export default Home;
