import React from "react";
import { Container, Typography, Button, Avatar, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const user = {
        name: "Александр Иванов",
        avatar: "https://via.placeholder.com/100",
        posts: [ 
            { id: 1, content: "Всем привет! Это мой первый пост." },
            { id: 2, content: "Я крутой чувак!" },
            { id: 3, content: "Работаю над проектом" }
        ]
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                justifyContent: "center"
            }}
        >
            <Avatar src={user.avatar} sx={{ width: 100, height: 100, mb: 2 }} />

            <Typography variant="h5" gutterBottom>
                Добро пожаловать, {user.name}!
            </Typography>

            {user.posts.map((post) => ( 
                <Card key={post.id} sx={{ width: "100%", mt: 2 }}>
                    <CardContent>
                        <Typography variant="body1">{post.content}</Typography>
                    </CardContent>
                </Card>
            ))}

            <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 3 }}
                onClick={() => navigate("/")}
            >
                Выйти
            </Button>
        </Container>
    );
}

export default Home;
