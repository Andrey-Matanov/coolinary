import configuredAxios from "../../utils/configuredAxios.js";

export const FETCH_RATING = "@@rating/FETCH_RATING";

export const fetchRating = () => async (dispatch) => {

    const response = await configuredAxios.get(`/users?rating`);
    const data = await response.data;
    console.log(data)
    dispatch({
        type: FETCH_RATING,
        payload: {
            rating: data,
        },
    });
};
