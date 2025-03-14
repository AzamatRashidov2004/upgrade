import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./pages/components/Navbar";
//import { ProductPage } from "./pages/ProductPage";
import Footer from "./pages/components/Footer";
import CatalogPage from "./pages/CatalogPage";
import { ProductPage } from "./pages/ProductPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
