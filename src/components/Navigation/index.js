import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import CountryFilter from "../CountryFilter";
import ProduceFinder from "../ProduceFinder";
export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/" style={{ marginLeft: "2vw" }}>
        Seasonal Timeline 🌱
      </Navbar.Brand>
      <Nav style={{ marginLeft: "20vw" }}>
        <CountryFilter />
        <ProduceFinder />
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        id="basic-navbar-nav"
        style={{ justifyContent: "flex-end" }}
      >
        <Nav style={{ textAlign: "right", marginRight: "2vw" }} fill>
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
