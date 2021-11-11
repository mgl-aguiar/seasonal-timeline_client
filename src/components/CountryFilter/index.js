import React from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../../store/produce/actions";

export default function CountryFilter() {
  const dispatch = useDispatch();

  return (
    <div>
      {" "}
      <label for="countries">Select your country:</label>
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
      </select>
    </div>
  );
}
