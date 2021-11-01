import { apiUrl } from "../../config/constants";
import axios from "axios";

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
