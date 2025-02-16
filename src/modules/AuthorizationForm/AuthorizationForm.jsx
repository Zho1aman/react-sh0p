import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Paper, Typography, IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import loginData from "./AuthorizationData";
import AlertToast from "../../shared/components/AlertToast"

function AuthorizationForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ login: false, password: false });
    const handleChange = (field, value) => {
        if (field === "login") {
            setLogin(value);
            setError((prev) => ({ ...prev, login: false })); 
        } else {
            setPassword(value);
            setError((prev) => ({ ...prev, password: false })); 
        }
    };
    
    const [toastOpen, setToastOpen] = useState(false);
    
    const navigate = useNavigate(); 
    
    const clickHandler = () => { 
        let isValid = true;
    
        if (!login) {
            setError((prev) => ({ ...prev, login: true }));
            isValid = false;
        } else {
            setError((prev) => ({ ...prev, login: false }));
        }

        if (!password) {
            setError((prev) => ({ ...prev, password: true }));
            isValid = false;
        } else {
            setError((prev) => ({ ...prev, password: false }));
        }

        if (isValid) {
            const auth = loginData.some(
                (d) => d.login === login && d.password === password  
            );

            if (auth) {
                navigate("/home");
            } else {
                setError({ login: true, password: true });
                setToastOpen(true);
            }
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
            <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Авторизация
                </Typography>
                <TextField
                    fullWidth
                    label="Логин"
                    variant="outlined"
                    margin="normal"
                    value={login} 
                    onChange={(e) => handleChange("login", e.target.value)}
                     error={error.login}
                    helperText={error.login ? "Неверный логин или пароль" : ""}
                    />

                        <TextField
                            fullWidth
                            label="Пароль"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            error={error.password}
                            helperText={error.password ? "Неверный логин или пароль" : ""}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                <Button 
                    fullWidth
                    variant="contained" 
                    color="primary" 
                    onClick={clickHandler}
                    sx={{ marginTop: "16px" }}
                >
                    Войти
                </Button>
            </Paper>

            <AlertToast 
                open={toastOpen} 
                handleClose={() => setToastOpen(false)} 
                message="Неверный логин или пароль!" 
            />
        </Container>
    );
}

export default AuthorizationForm;
