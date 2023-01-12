import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

export function NavBar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand href="/">TITULO AQUI</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">TODAS AS PLACAS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">PLACAS NVIDIA</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">PLACAS AMD</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">PLACAS INTEL</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
