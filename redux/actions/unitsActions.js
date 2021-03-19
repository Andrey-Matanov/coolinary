import { baseURL } from "../../utils";
import axios from "axios"

export const FETCH_UNITS = "@@units/FETCH_UNITS";

export const fetchUnits = () => async (dispatch) => {
    const response = await axios.get(`${baseURL}/api/units`);
    const json = await response.data;

    dispatch({
        type: FETCH_UNITS,
        payload: {
            units: json,
        },
    });
};
