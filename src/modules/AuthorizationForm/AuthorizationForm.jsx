import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Paper, Typography, IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import loginData from "./AuthorizationData.js";
import AlertToast from "../../shared/components/AlertToast";

function AuthorizationForm() {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ login: "", password: "" });
    const [toastOpen, setToastOpen] = useState(false);

    const validateLogin = (value) => {
        if (!value) return "Введите логин";
        return "";
    };
    

    const validatePassword = (value) => {
        if (!value) return "Введите пароль";
        if (value.length < 4) return "Пароль должен быть от 4 символов";
        return "";
    };

    const handleChange = (field, value) => {
        if (field === "login") {
            setLogin(value);
            setError((prev) => ({ ...prev, login: validateLogin(value) }));
        } else {
            setPassword(value);
            setError((prev) => ({ ...prev, password: validatePassword(value) }));
        }
    };

    const clickHandler = () => { 
        const loginError = validateLogin(login);
        const passwordError = validatePassword(password);

        if (loginError || passwordError) {
            setError({ login: loginError, password: passwordError });
            return;
        }

        const auth = loginData.some((d) => d.login === login && d.password === password);
            console.log("loginData:", loginData);
            console.log("Entered:", login, password);

        auth ? navigate("/home") : setToastOpen(true);
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
                    error={Boolean(error.login)}
                    helperText={error.login}
                />

                <TextField
                    fullWidth
                    label="Пароль"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    error={Boolean(error.password)}
                    helperText={error.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
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
