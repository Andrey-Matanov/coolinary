import { baseURL } from "../../utils";

export const FETCH_UNITS = "@@units/FETCH_UNITS";

export const fetchUnits = () => async (dispatch) => {
    const response = await fetch(`${baseURL}/api/units`);
    const json = await response.json();

    dispatch({
        type: FETCH_UNITS,
        payload: {
            units: json,
        },
    });
};
