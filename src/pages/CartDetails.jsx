import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Card, CardContent } from "@mui/material";

function CartDetails() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                if (!response.ok) throw new Error("Ошибка загрузки");
                const data = await response.json();
                setCart(data);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };
        fetchCart();
    }, [id]);

    if (!cart) return <Typography>Загрузка...</Typography>;

    return (
        <Container maxWidth="sm">
            <Card sx={{ padding: "20px", textAlign: "center" }}>
                <CardContent>
                    <Typography variant="h5">{cart.title}</Typography>
                    <Typography variant="body1">{cart.description}</Typography>
                    <Typography variant="h6" color="primary">Цена: ${cart.price}</Typography>
                </CardContent>
                <Button variant="contained" color="secondary" onClick={() => navigate("/home")}>
                    Назад
                </Button>
            </Card>
        </Container>
    );
}

export default CartDetails;
