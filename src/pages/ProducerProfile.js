import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import { selectProducerProfile } from "../store/produce/selectors";
import { fetchProducerProfile } from "../store/produce/actions";
import { selectUser } from "../store/user/selectors";
import { Link } from "react-router-dom";

import "../style/UserProfile.css";

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
    <>
      {!producerProfile ? (
        <Loading />
      ) : (
        <div className="gridContainer">
          <img
            className="userImage"
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
              <ul className="list">
                {produces.map((eachProduce) => {
                  return (
                    <li>
                      <Link
                        to={`/produce/${eachProduce.id}`}
                        className="listItem"
                      >
                        {eachProduce.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {token && email === producerProfile.email ? (
            <Link to={`/edit-profile/${id}`}>
              <button className="button">Edit profile</button>
            </Link>
          ) : null}
        </div>
      )}
    </>
  );
}
