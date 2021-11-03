import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProduces } from "../../store/produce/selectors";
import {
  fetchAllProduces,
  fetchCountryProduces,
} from "../../store/produce/actions";
import { Link } from "react-router-dom";

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

      <div className="produceGrid">
        {produces.map((eachProduce, index) => {
          const yearOverlap = eachProduce.seasonStart > eachProduce.seasonEnd;

          return (
            <>
              <div
                className="produceGridItem"
                style={{
                  gridColumnStart: `${
                    yearOverlap ? 1 : eachProduce.seasonStart
                  }`,
                  gridColumnEnd: `${eachProduce.seasonEnd + 1}`,
                  gridRowStart: `${index + 1}`,
                  gridRowEnd: `${index + 1}`,
                }}
              >
                <Link to={`/produce/${eachProduce.id}`}>
                  {eachProduce.name}
                </Link>
              </div>

              {yearOverlap ? (
                <div
                  className="produceGridItem"
                  style={{
                    gridColumnStart: `${eachProduce.seasonStart}`,
                    gridColumnEnd: 25,
                    gridRowStart: `${index + 1}`,
                    gridRowEnd: `${index + 1}`,
                  }}
                >
                  <Link to={`/produce/${eachProduce.id}`}>
                    {eachProduce.name}
                  </Link>
                </div>
              ) : null}
            </>
          );
        })}
      </div>
    </div>
  );
}
