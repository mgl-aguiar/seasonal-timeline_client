import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import { selectProducerProfile } from "../store/produce/selectors";
import { fetchProducerProfile } from "../store/produce/actions";

import Loading from "../components/Loading";

export default function ProducerProfile() {
  const dispatch = useDispatch();
  const { producerId } = useParams();

  const producerProfile = useSelector(selectProducerProfile);
  const produces = producerProfile.produces;

  useEffect(() => {
    dispatch(fetchProducerProfile(producerId));
  }, []);

  return (
    <div>
      <h1>{producerProfile.name}</h1>
      <img src={producerProfile.profileImg} alt={producerProfile.name}></img>
      <h3>Description</h3>
      <p>{producerProfile.description}</p>
      <h3>Contact</h3>
      <p>{producerProfile.website}</p>
      <p>{producerProfile.email}</p>
      <p>{producerProfile.phone}</p>
      <h3>Locations</h3>
      <p>{producerProfile.location}</p>
      <h3>Available produces</h3>

      {!produces ? (
        <Loading />
      ) : (
        <div>
          {produces.map((eachProduce) => {
            return (
              <a href={`/produce/${eachProduce.id}`}>{eachProduce.name}</a>
            );
          })}
        </div>
      )}
    </div>
  );
}
