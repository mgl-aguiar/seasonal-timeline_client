import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProduces } from "../../store/produce/selectors";
import {
  fetchAllProduces,
  fetchCountryProduces,
} from "../../store/produce/actions";

import ProduceBar from "./ProduceBar";

import "./timeline.css";

export default function ProduceCard() {
  const dispatch = useDispatch();
  const [countryId, setCountryId] = useState(0);
  
  const produces = useSelector(selectAllProduces);

  useEffect(() => {
    if (countryId === 0) {
      dispatch(fetchAllProduces());
    } else {
      dispatch(fetchCountryProduces(countryId));
    }
  }, [countryId]);

  return (
    <div>
      <div className="filterMenu">
        <label htmlFor="countries">Filter produces:</label>
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

      <div className="produceGrid">
        {produces.map((eachProduce, index) => {
          // I made this a component since it made sense and I needed state for each one
          return <ProduceBar produce={eachProduce} key={index} index={index}></ProduceBar>
        })}
      </div>
    </div>
  );
}
