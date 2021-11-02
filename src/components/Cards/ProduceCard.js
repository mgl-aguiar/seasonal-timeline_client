import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProduces } from "../../store/produce/selectors";
import {
  fetchAllProduces,
  fetchCountryProduces,
} from "../../store/produce/actions";

import "./produceCard.css";

export default function ProduceCard() {
  const dispatch = useDispatch();
  const [countryId, setCountryId] = useState(0);
  console.log(countryId);

  const produces = useSelector(selectAllProduces);

  useEffect(() => {
    if (countryId === 0) {
      dispatch(fetchAllProduces());
    } else {
      dispatch(fetchCountryProduces(countryId));
    }
  }, [countryId]);

  return (
    <div className="produceContainer">
      <div className="dropdown">
        <label for="countries">Filter produces:</label>

        <select
          name="countries"
          id="countries"
          onChange={(event) => setCountryId(parseInt(event.target.value))}
        >
          <option value={0}>all</option>
          <option value={1}>Netherlands</option>
          <option value={2}>Portugal</option>
        </select>
      </div>

      {produces.map((eachProduce) => {
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
