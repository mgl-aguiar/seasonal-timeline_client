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
import ProduceBar from "./ProduceBar";

import "../../style/timeline.css";

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
          return (
            <ProduceBar
              produce={eachProduce}
              key={index}
              index={index}
            ></ProduceBar>
          );
        })}
      </div>
    </div>
  );
}
