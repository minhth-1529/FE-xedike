import { GET_TRIPS, SEARCH_TRIPS } from './actionTypes';

let initialState = [];

export const Trips = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIPS:
            return action.payload;
        case SEARCH_TRIPS:
            return action.payload;
        default:
            return state;
    }
};
