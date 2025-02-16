import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Home from "./pages/Home"; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Authorization />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
