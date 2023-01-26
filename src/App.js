import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import PrivateComp from "./Components/PrivateComp";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import ProductListing from "./Components/ProductListing";
import UpdateProduct from "./Components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path="/" element={<ProductListing />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            {/* <Route path="/profile" element={<h1>Profile Component</h1>} /> */}
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
