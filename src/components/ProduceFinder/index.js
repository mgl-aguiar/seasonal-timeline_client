import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectAllProduces } from "../../store/produce/selectors";

import "../../style/Dropdown.css";

export default function ProduceFinder() {
  const history = useHistory();
  const allProduces = useSelector(selectAllProduces);

  return (
    <div className="dropdown">
      {" "}
      <label for="produces" style={{ margin: "0 10px 0 20px" }}>
        Find a produce:
      </label>
      <select
        name="produces"
        id="produces"
        onChange={(event) => history.push(`/produce/${event.target.value}`)}
      >
        {allProduces.map((eachProduce) => {
          return <option value={eachProduce.id}>{eachProduce.name}</option>;
        })}
      </select>
    </div>
  );
}
