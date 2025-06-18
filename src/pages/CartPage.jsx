import React from "react";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cart }) => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px" }}>
        🛒 Корзина
      </Typography>

      {cart.length === 0 ? (
        <Typography>Корзина пуста</Typography>
      ) : (
        cart.map((item) => (
          <Card key={item.id} sx={{ marginBottom: "10px", padding: "10px" }}>
            <CardContent>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>Количество: {item.quantity}</Typography>
              <Typography>Цена: ${item.price * item.quantity}</Typography>
            </CardContent>
          </Card>
        ))
      )}

      <Button variant="contained" color="primary" fullWidth onClick={() => navigate("/")}>
        Вернуться к покупкам
      </Button>
    </Container>
  );
};

export default CartPage;
