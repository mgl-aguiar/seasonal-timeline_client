import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../store/produce/actions";

import "../../style/Dropdown.css";

export default function CountryFilter() {
  const dispatch = useDispatch();

  return (
    <div className="dropdown">
      {" "}
      <label for="countries" style={{ marginRight: "10px" }}>
        Select your country:
      </label>
      <select
        name="countries"
        id="countries"
        onChange={(event) =>
          dispatch(updateFilter(parseInt(event.target.value)))
        }
      >
        <option value={0}>all</option>
        <option value={1}>Netherlands</option>
        <option value={2}>Portugal</option>
        <option value={3}>Greece</option>
      </select>
    </div>
  );
}
