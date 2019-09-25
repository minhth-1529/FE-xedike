import {
    GET_TRIPS,
    SEARCH_TRIPS,
    GET_HISTORY_TRIPS,
    GET_DETAIL_TRIP,
    CREATE_TRIP,
    FINISH_TRIP
} from './actionTypes';
import _ from 'lodash';

let initialState = [];

export const Trips = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIPS:
            return action.payload;
        case CREATE_TRIP:
            return [...state, action.payload];
        case SEARCH_TRIPS:
            return action.payload;
        case GET_HISTORY_TRIPS:
            return action.payload;
        case FINISH_TRIP:
            let arr = [...state];

            const index = _.findIndex(arr, trip => {
                return trip._id === action.payload._id;
            });

            arr[index].isFinished = action.payload.isFinished;
            arr[index].driverID.rate = action.payload.driverID.rate;

        return [...arr];
        case GET_DETAIL_TRIP:
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
};
