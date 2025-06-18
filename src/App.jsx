import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';  // Импортируем Home компонент
import CartPage from "./pages/CartPage";
import products from "./data/products";  // Используем данные о товарах

function App() {
  const [cart, setCart] = useState([]);  // Состояние корзины

  // Функция для добавления товаров в корзину
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
       
        <Route path="/cart" element={<CartPage cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;



