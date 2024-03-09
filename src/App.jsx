import CartDetails from "./components/CartDetails";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Headers";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartDetails />} />
      </Routes>
    </>
  );
}

export default App;
