import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import { Link } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <NavbarItem
        path={`/producer/${user.id}`}
        linkText="My Producer Profile"
      />
      <Button onClick={() => dispatch(logOut())}>
        <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
          Logout
        </Link>
      </Button>
    </>
  );
}
