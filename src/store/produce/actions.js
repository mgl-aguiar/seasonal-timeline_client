import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectUser } from "../user/selectors";
import { setMessage, showMessageWithTimeout } from "../appState/actions";

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

///////////////////////////////////////////////////////
export const loadProducerProfile = (producerProfile) => {
  return {
    type: "produces/loadProducerProfile",
    payload: producerProfile,
  };
};

export function fetchProducerProfile(producerId) {
  return async (dispatch) => {
    const res = await axios.get(`${apiUrl}/producer/${producerId}`);
    const produceDetails = res.data;

    dispatch(loadProducerProfile(produceDetails));
  };
}

///////////////////////////////////////////////////////
export const loadUpdatedProfile = (updatedProfile) => {
  return {
    type: "produces/loadUpdatedProfile",
    payload: updatedProfile,
  };
};

export function editProducerProfile(
  name,
  description,
  website,
  phone,
  profileImg,
  location
) {
  return async (dispatch, getState) => {
    const user = selectUser(getState());

    try {
      const res = await axios.patch(`${apiUrl}/producer/edit/${user.id}`, {
        name,
        description,
        website,
        phone,
        profileImg,
        location,
      });

      dispatch(loadUpdatedProfile(res.data.producerProfile));
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Your profile was updated!",
          3000
        )
      );
    } catch {
      dispatch(setMessage("danger", true, "Could not update profile"));
    }
  };
}

///////////////////////////////////////////////////////
export const updateFilter = (countryId) => {
  return {
    type: "produces/loadCountryId",
    payload: countryId,
  };
};
