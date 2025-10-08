import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/checkout/:productId" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}