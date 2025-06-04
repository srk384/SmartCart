import "./App.css";
import Cartpage from "./pages/Cartpage";
import Confirmationpage from "./pages/Confirmationpage";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import PageNotFound from "./compnonents/PageNotFound";


function App() {
  return (
    <div className="body bg-[#f4f4f4] ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/confirmation" element={<Confirmationpage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<Categories />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
