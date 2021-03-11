import { baseURL } from "../../utils";

export const FETCH_RATING = "@@rating/FETCH_RATING";

export const fetchRating = () => async (dispatch) => {
    const response = await fetch(`${baseURL}/api/rating`);
    const json = await response.json();

    dispatch({
        type: FETCH_RATING,
        payload: {
            rating: json.rating,
        },
    });
};
