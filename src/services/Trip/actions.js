import { GET_TRIPS, SEARCH_TRIPS } from './actionTypes';
import apiCaller from 'utils/apiCaller';

export const fetchTripsRequest = () => {
    return dispatch => {
        return apiCaller('api/trips', 'GET', null).then(res => {
            dispatch(getTrips(res.data));
        });
    };
};

export const getTrips = payload => {
    return {
        type: GET_TRIPS,
        payload
    };
};

export const searchTrips = payload => {
    return {
        type: SEARCH_TRIPS,
        payload
    };
};
