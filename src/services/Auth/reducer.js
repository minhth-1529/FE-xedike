import { AUTH_LOGIN, AUTH_LOGOUT } from './actionTypes';
import jwtDecode from 'jwt-decode';

let initialState = {
    user: {},
    authenticate: false
};

export const Authenticate = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            localStorage.setItem('auth', JSON.stringify(action.payload));

            return {
                ...state,
                user: jwtDecode(action.payload),
                authenticate: true
            };

        case AUTH_LOGOUT:
            localStorage.removeItem('auth');

            return {
                ...state,
                user: {},
                authenticate: false
            };
        default:
            return state;
    }
};
