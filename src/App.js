import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Alta from "./pages/Alta"; 
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Carrito from "./pages/Carrito";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alta" element={<Alta />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
