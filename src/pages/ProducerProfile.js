import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import { selectProducerProfile } from "../store/produce/selectors";
import { fetchProducerProfile } from "../store/produce/actions";
import { selectUser } from "../store/user/selectors";
import { Link } from "react-router-dom";

import "./ProducerProfile.css";

import Loading from "../components/Loading";

export default function ProducerProfile() {
  const dispatch = useDispatch();
  const { producerId } = useParams();

  const producerProfile = useSelector(selectProducerProfile);
  const produces = producerProfile.produces;

  const { id, token, email } = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchProducerProfile(producerId));
  }, []);

  return (
    <div className="gridContainer">
      <img
        className="gridImage"
        src={producerProfile.profileImg}
        alt={producerProfile.name}
      ></img>

      <h1 className="gridHeader">{producerProfile.name}</h1>

      <div className="gridSide">
        <h3>Contact</h3>
        <p>{producerProfile.website}</p>
        <p>{producerProfile.email}</p>
        <p>{producerProfile.phone}</p>
        <h3>Locations</h3>
        <p>{producerProfile.location}</p>
      </div>

      <div className="gridMain">
        <h3>Description</h3>
        <p>{producerProfile.description}</p>
        <h3>Available produces</h3>

        {!produces ? (
          <Loading />
        ) : (
          <ul>
            {produces.map((eachProduce) => {
              return (
                <li>
                  <a href={`/produce/${eachProduce.id}`}>{eachProduce.name}</a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {token && email === producerProfile.email ? (
        <Link to={`/edit-profile/${id}`}>
          <button>Edit profile</button>
        </Link>
      ) : null}
    </div>
  );
}
