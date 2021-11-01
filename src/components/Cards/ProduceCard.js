import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProduces } from "../../store/produce/selectors";
import { fetchAllProduces } from "../../store/produce/actions";

import "./produceCard.css";

export default function ProduceCard() {
  const dispatch = useDispatch();
  const allProduces = useSelector(selectAllProduces);

  useEffect(() => {
    dispatch(fetchAllProduces());
  }, [dispatch]);
  return (
    <div className="produceContainer">
      {allProduces.map((eachProduce) => {
        return (
          <div key={eachProduce.id} className="produceCard">
            <h3>{eachProduce.name}</h3>
            <img src={eachProduce.imageUrl} alt={eachProduce.name}></img>
          </div>
        );
      })}
    </div>
  );
}
