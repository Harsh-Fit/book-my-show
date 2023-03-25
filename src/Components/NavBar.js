import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

function NavBar() {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  // After Signup switch to Logout
  const auth = localStorage.getItem("user");
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  // console.log("NAV", userEmail);

  setTimeout(() => {
    const auth = localStorage.getItem("user");
    let data = JSON.parse(auth);
    if (data) {
      setUserEmail(data.email);
    }
  });

  const handleSubmit = (email) => {
    setTimeout(() => navigate(`/ticket-details/${email}`), 100);
  };

  const handleAdminLogin = () => {
    setTimeout(() => navigate(`/admin-login`), 100);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <img
            style={{ width: "150px" }}
            src="https://logos.textgiraffe.com/logos/logo-name/33383601-designstyle-cookies-m.png"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {auth ? (
              <>
                <NavLink className="navLinkStyle" to="/">
                  Movies
                </NavLink>
                {/* <NavLink className="navLinkStyle" to="/add">
                  Add Movies
                </NavLink>
                <NavLink className="navLinkStyle" to="/">
                  Update Movies
                </NavLink> */}
                {/* <NavLink className="navLinkStyle" to="/admin-panel">
                  Admin Panel
                </NavLink> */}
                <NavLink className="navLinkStyle" onClick={logout} to="/signup">
                  Logout ( {JSON.parse(auth).fname} )
                </NavLink>
                <Button
                  variant="danger"
                  onClick={() => handleSubmit(userEmail)}
                  style={{ float: "right", position: "relative", left: "280%" }}
                >
                  My Booking
                </Button>
              </>
            ) : (
              <>
                <NavLink className="navLinkStyle" to="/signup">
                  Sign Up
                </NavLink>{" "}
                <NavLink className="navLinkStyle" to="/login">
                  Login
                </NavLink>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleAdminLogin()}
                  style={{ float: "right", position: "relative", left: "280%" }}
                >
                  Admin Login
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
