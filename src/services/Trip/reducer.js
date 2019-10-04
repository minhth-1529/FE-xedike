import {
    GET_TRIPS,
    SEARCH_TRIPS,
    GET_HISTORY_TRIPS,
    GET_DETAIL_TRIP,
    CREATE_TRIP,
    FINISH_TRIP
} from './actionTypes';
import _ from 'lodash';

let initialState = {
    isLoading: true,
    data: [
        {
            _id: '',
            locationFrom: '',
            locationTo: '',
            availableSeats: '',
            fee: 10000,
            driverID: {
                rate: 0,
                _id: '',
                fullName: ''
            }
        }
    ]
};

export const Trips = (state = initialState, action) => {
    switch (action.type) {
        case GET_TRIPS:
            return {
                isLoading: false,
                data: action.payload
            };
        case CREATE_TRIP:
            state.data.push(action.payload);

            return {
                isLoading: false,
                data: [...state.data]
            };
        case SEARCH_TRIPS:
            return {
                isLoading: false,
                data: action.payload
            };
        case GET_HISTORY_TRIPS:
            return {
                isLoading: false,
                data: action.payload
            };
        case FINISH_TRIP:
            let arr = [...state.data];
            const index = _.findIndex(arr, trip => {
                return trip._id === action.payload._id;
            });

            arr[index].isFinished = action.payload.isFinished;
            arr[index].driverID.rate = action.payload.driverID.rate;

            return {
                data: [...arr]
            };
        case GET_DETAIL_TRIP:
            return {
                isLoading: false,
                data: action.payload
            };
        default:
            return state;
    }
};
