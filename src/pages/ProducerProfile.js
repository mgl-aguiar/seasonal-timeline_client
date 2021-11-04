import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/selectors";

export default function ProducerProfile() {
  const user = useSelector(selectUser);

  return (
    <div className="producerProfileGrid">
      <h1>{user.name}</h1>
      <img src={user.profileImg} alt={user.name}></img>
      <h3>Description</h3>
      <p>{user.description}</p>
      <h3>Contact</h3>
      <p>{user.website}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <h3>Locations</h3>
      <p>{user.location}</p>
      <h3>Produces</h3>
    </div>
  );
}
