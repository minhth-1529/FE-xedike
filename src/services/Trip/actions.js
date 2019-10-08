import {
    GET_TRIPS,
    GET_DETAIL_TRIP,
    FINISH_TRIP,
    CREATE_TRIP
} from './actionTypes';
import apiCaller from 'utils/apiCaller';
import swal from 'sweetalert';

export const getTrips = limit => {
    return dispatch => {
        return apiCaller(`trips/${limit}`, 'GET', null)
            .then(res => {
                dispatch({
                    type: GET_TRIPS,
                    payload: res.data
                });
            })
            .catch(err => console.log(err.response));
    };
};

export const getDetailTrip = id => {
    return dispatch => {
        return apiCaller(`trips/detail/${id}`, 'GET', null)
            .then(res => {
                dispatch({
                    type: GET_DETAIL_TRIP,
                    payload: res.data
                });
            })
            .catch(err => console.log(err.response));
    };
};

export const finishTrip = tripID => {
    return dispatch => {
        return apiCaller(`trips/finish-trip/${tripID}`, 'PUT', null)
            .then(res => {
                dispatch({
                    type: FINISH_TRIP,
                    payload: res.data
                });
                swal({
                    title: 'Finish trip successfully!',
                    icon: 'success',
                    timer: 2000
                });
            })
            .catch(err => console.log(err));
    };
};

export const createTrip = (data, callback) => {
    return dispatch => {
        return apiCaller(`trips`, 'POST', data)
            .then(res => {
                swal({
                    text: 'Create trip successfully!',
                    icon: 'success',
                    buttons: false,
                    timer: 1500
                }).then(() => {
                    dispatch({
                        type: CREATE_TRIP,
                        payload: res.data
                    });
                    callback();
                });
            })
            .catch(err => console.log(err.response));
    };
};
