import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchProduceDetails } from "../store/produce/actions";
import { selectProduceDetails } from "../store/produce/selectors";

export default function ProduceDetails() {
  const dispatch = useDispatch();
  const { produceId } = useParams();

  const produce = useSelector(selectProduceDetails);
  const localProducer = produce.users;
  console.log(localProducer);

  useEffect(() => {
    dispatch(fetchProduceDetails(produceId));
  }, []);
  return (
    <div>
      <h1>{produce.name}</h1>
      <img
        src={`${produce.imageUrl}`}
        alt={`${produce.name}`}
        style={{ height: "200px" }}
      ></img>
      <p>{produce.seasonality}</p>
      <h3>History:</h3>
      <p>{produce.history}</p>
      <h3>Geography:</h3>
      <p>{produce.geography}</p>
      <h3>Nutrition:</h3>
      <p>{produce.nutrition}</p>
      <h3> Local producers:</h3>

      {localProducer.length !== 0 ? (
        localProducer.map((eachProducer) => {
          return (
            <a href={`/producer/:${eachProducer.id}`}>{eachProducer.name}</a>
          );
        })
      ) : (
        <p>No local producers yet.</p>
      )}
    </div>
  );
}
