import { GET_TRIPS, SEARCH_TRIPS } from './actionTypes';
import apiCaller from 'utils/apiCaller';

export const getTrips = () => {
    return dispatch => {
        return apiCaller('trips', 'GET', null).then(res => {
            dispatch({
                type: GET_TRIPS,
                payload: res.data
            });
        });
    };
};

export const searchTrips = payload => {
    return {
        type: SEARCH_TRIPS,
        payload
    };
};
