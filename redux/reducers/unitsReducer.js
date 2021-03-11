import { FETCH_UNITS } from "../actions/unitsActions";

export const unitsReducer = (units = [], action) => {
    switch (action.type) {
        case FETCH_UNITS: {
            return action.payload.units;
        }
        default: {
            return units;
        }
    }
};
