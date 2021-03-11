import { baseURL } from "../../utils";

export const FETCH_CATEGORIES = "@@categories/FETCH_CATEGORIES";

export const fetchCategories = () => async (dispatch) => {
    const response = await fetch(`${baseURL}/api/categories`);
    const json = await response.json();

    dispatch({
        type: FETCH_CATEGORIES,
        payload: {
            categories: json,
        },
    });
};
