import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Footer from "./Components/Footer";
import SignUp from "./Components/SignUp";
import PrivateComp from "./Components/PrivateComp";
import Login from "./Components/Login";
import ConfirmBooking from "./Components/ConfirmBooking";
import MovieListing from "./Components/MovieListing";
import ATMcard from "./Components/ATMcard";
import Ticket from "./Components/Ticket";
import MyBooking from "./Components/MyBooking";
import AdminLogin from "./Components/AdminLogin";
import AdminPanel from "./Components/AdminPanel";

// import UpdateProduct from "./Components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path="/" element={<MovieListing />} />
            <Route path="/book/:id" element={<ConfirmBooking />} />
            <Route path="/ATM-Details" element={<ATMcard />} />
            <Route path="/ticket-details/:email" element={<Ticket />} />
            <Route path="/myBooking/:email" element={<MyBooking />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
