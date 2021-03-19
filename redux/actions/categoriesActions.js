import { baseURL } from "../../utils";
import axios from "axios";

export const FETCH_CATEGORIES = "@@categories/FETCH_CATEGORIES";

export const fetchCategories = () => async (dispatch) => {
    const response = await axios.get(`${baseURL}/api/categories`);
    const json = await response.data;

    dispatch({
        type: FETCH_CATEGORIES,
        payload: {
            categories: json,
        },
    });
};
