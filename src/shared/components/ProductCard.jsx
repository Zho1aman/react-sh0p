import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => setQuantity(quantity + 1);
  const handleRemove = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  return (
    <Card sx={{ cursor: "pointer", textAlign: "center", padding: "10px" }}>
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
        <Typography variant="body2" color={product.availabilityStatus === "In Stock" ? "green" : "red"}>
          {product.availabilityStatus}
        </Typography>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "10px" }}>
          <Button variant="contained" color="secondary" onClick={handleRemove} disabled={quantity === 0}>-</Button>
          <Typography>{quantity}</Typography>
          <Button variant="contained" color="primary" onClick={handleAdd}>+</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
