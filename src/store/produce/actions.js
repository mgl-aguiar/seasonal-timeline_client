import { apiUrl } from "../../config/constants";
import axios from "axios";

///////////////////////////////////////////////////////
export const loadAllProduces = (produces) => {
  return {
    type: "produces/loadAllProduces",
    payload: produces,
  };
};

export function fetchAllProduces() {
  return async (dispatch) => {
    const res = await axios.get(`${apiUrl}/produce/all`);
    const allProduces = res.data;

    dispatch(loadAllProduces(allProduces));
  };
}

///////////////////////////////////////////////////////
export const loadCountryProduces = (countryWithProduces) => {
  return {
    type: "produces/loadCountryProduces",
    payload: countryWithProduces,
  };
};

export function fetchCountryProduces(countryId) {
  return async (dispatch) => {
    const res = await axios.get(`${apiUrl}/produce/country/${countryId}`);
    const countryProduces = res.data;

    dispatch(loadCountryProduces(countryProduces));
  };
}

///////////////////////////////////////////////////////
export const loadProduceDetails = (produceDetails) => {
  return {
    type: "produces/loadProduceDetails",
    payload: produceDetails,
  };
};

export function fetchProduceDetails(produceId) {
  return async (dispatch) => {
    const res = await axios.get(`${apiUrl}/produce/details/${produceId}`);
    const produceDetails = res.data;

    dispatch(loadProduceDetails(produceDetails));
  };
}
