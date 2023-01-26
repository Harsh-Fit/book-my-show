import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  // After Signup switch to Logout
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <img
            style={{ width: "150px" }}
            src="https://logos.textgiraffe.com/logos/logo-name/32820510-designstyle-cookies-m.png"
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
                  Products
                </NavLink>
                <NavLink className="navLinkStyle" to="/add">
                  Add Product
                </NavLink>
                <NavLink className="navLinkStyle" to="/">
                  Update Product
                </NavLink>
                {/* <NavLink className="navLinkStyle" to="/profile">
                  Profile
                </NavLink> */}
                <NavLink className="navLinkStyle" onClick={logout} to="/signup">
                  Logout ( {JSON.parse(auth).name} )
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="navLinkStyle" to="/signup">
                  Sign Up
                </NavLink>{" "}
                <NavLink className="navLinkStyle" to="/login">
                  Login
                </NavLink>{" "}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
