import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button color="inherit" onClick={() => navigate("/")}>Главная</Button>
        <Button color="inherit" onClick={() => navigate("/cart")}>
          <ShoppingCartIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
    