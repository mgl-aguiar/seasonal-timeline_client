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
                <svg width="100%" height="100%">
                  <line
                    x1="0"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    stroke="grey"
                    stroke-width="0.5"
                  />
                  <defs>
                    <clipPath id="circleView">
                      <circle cx="25%" cy="50%" r="30px" fill="grey" />
                    </clipPath>
                  </defs>
                  <image
                    alt={eachProduce.name}
                    xlinkHref={eachProduce.imageUrl}
                    style={{
                      clipPath: "url(#circleView)",
                    }}
                  />
                  {yearOverlap ? null : (
                    <circle cx="0" cy="50%" r="3px" fill="grey" />
                  )}
                  <circle cx="100%" cy="50%" r="3px" fill="grey" />
                </svg>
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
                  <svg width="100%" height="100%">
                    <line
                      x1="0"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                      stroke="grey"
                      stroke-width="0.5"
                    />
                    <img src={eachProduce.imageUrl} alt={eachProduce.name} />
                    <circle cx="50%" cy="50%" r="30px" fill="grey" />
                    <circle cx="3px" cy="50%" r="3px" fill="grey" />
                  </svg>
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
