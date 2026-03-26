"use client";
import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CustomNavbar = () => {
  const pathname = usePathname();
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
        <Navbar.Brand as={Link} href="/" onClick={() => setExpanded(false)}>🎬iBommaFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                href={item.path}
                className={pathname === item.path ? "nav-active" : ""}
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
