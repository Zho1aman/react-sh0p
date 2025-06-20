import React, { useState } from "react";
import { CircularProgress, Typography, Box, Card, CardContent, CardMedia, Button, Rating } from "@mui/material";
import useAllProducts from "../shared/Api/all-products";
import SearchBar from "../shared/components/SearchBar";

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
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 2 }}>
          {sortedProducts.map((product) => (
            <Card key={product.id} sx={{ textAlign: "center", padding: "10px" }}>
              <CardMedia
                component="img"
                height="180"
                image={product.thumbnail || product.images[0]}
                alt={product.title}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Цена: ${product.price}
                </Typography>
                <Rating name="read-only" value={product.rating} precision={0.5} readOnly sx={{ margin: "10px 0" }} />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Typography>Ничего не найдено</Typography>
      )}
    </div>
  );
};

export default Home;