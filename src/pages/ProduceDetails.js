import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchProduceDetails } from "../store/produce/actions";
import { selectProduceDetails } from "../store/produce/selectors";
import Loading from "../components/Loading";

import "./ProduceDetails.css";

export default function ProduceDetails() {
  const dispatch = useDispatch();
  const { produceId } = useParams();

  const produce = useSelector(selectProduceDetails);
  const localProducer = produce.users;

  useEffect(() => {
    dispatch(fetchProduceDetails(produceId));
  }, []);
  return (
    <div className="gridContainer">
      <img
        src={`${produce.imageUrl}`}
        alt={`${produce.name}`}
        className="gridImage"
      ></img>
      <div className="gridHeader">
        <h1>{produce.name}</h1>
        <p>{produce.seasonality}</p>
      </div>
      <div className="gridSide">
        <h3>Local producers:</h3>

        {!localProducer ? (
          <Loading />
        ) : (
          <div>
            {" "}
            {localProducer.length !== 0 ? (
              localProducer.map((eachProducer) => {
                return (
                  <a href={`/producer/${eachProducer.id}`}>
                    {eachProducer.name}
                  </a>
                );
              })
            ) : (
              <p>No local producers yet</p>
            )}
          </div>
        )}
      </div>
      <div className="gridMain">
        <h3>History:</h3>
        <p>{produce.history}</p>
        <h3>Geography:</h3>
        <p>{produce.geography}</p>
        <h3>Nutrition:</h3>
        <p>{produce.nutrition}</p>
      </div>
    </div>
  );
}
