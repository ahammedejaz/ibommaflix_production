import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const CustomNavbar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Tollywood", path: "/category/tollywood" },
    { label: "Bollywood", path: "/category/bollywood" },
    { label: "Hollywood", path: "/category/hollywood" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <Navbar bg="dark" expand="lg" variant="dark" expanded={expanded} onToggle={setExpanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>🎬iBommaFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={location.pathname === item.path ? "nav-active" : ""}
                onClick={() => setExpanded(false)}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
