import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProduces,
  selectFilterState,
} from "../../store/produce/selectors";
import {
  fetchAllProduces,
  fetchCountryProduces,
} from "../../store/produce/actions";
import { Link } from "react-router-dom";

import "./timeline.css";

export default function ProduceCard() {
  const dispatch = useDispatch();
  const countryId = useSelector(selectFilterState);
  const produces = useSelector(selectAllProduces);

  useEffect(() => {
    if (!countryId || countryId === 0) {
      dispatch(fetchAllProduces());
    } else {
      dispatch(fetchCountryProduces(countryId));
    }
  }, [countryId]);

  return (
    <div>
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
