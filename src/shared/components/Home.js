import React, { useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import useAllProducts from "../shared/Api/all-products";
import SearchBar from "../shared/components/SearchBar";
import SortSelect from "../components/SortSelect";
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
     
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <SearchBar value={search} onChange={setSearch} />
        <SortSelect value={sortType} onChange={setSortType} />
      </div>

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
