import {
    GET_HISTORY_TRIPS
} from './actionTypes';

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

export const HistoryTrips = (state = initialState, action) => {
    switch (action.type) {
        case GET_HISTORY_TRIPS:
            return {
                isLoading: false,
                data: action.payload
            };
        default:
            return {
                ...state
            };
    }
};
