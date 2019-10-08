import {
    GET_HISTORY_TRIPS
} from './actionTypes';
import apiCaller from 'utils/apiCaller';

export const getHistoryTrips = () => {
    return dispatch => {
        return apiCaller('users/history-trips', 'GET', null)
            .then(res => {
                dispatch({
                    type: GET_HISTORY_TRIPS,
                    payload: res.data
                });
            })
            .catch(err => console.log(err.response));
    };
};
