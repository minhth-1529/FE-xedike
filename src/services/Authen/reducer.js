import { AUTHEN_LOGIN } from './actionTypes';
import jwtDecode from 'jwt-decode';

let initialState = {};

export const Authenticate = (state = initialState, action) => {
    switch (action.type) {
        case AUTHEN_LOGIN:
            state = jwtDecode(action.payload);

            return { ...state };
        default:
            return state;
    }
};
