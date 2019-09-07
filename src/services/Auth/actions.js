import { AUTH_LOGIN, AUTH_LOGOUT } from './actionTypes';

export const authLogin = (payload, callback) => {
    return {
        type: AUTH_LOGIN,
        payload
    };
};

export const authLogout = () => {
    return {
        type: AUTH_LOGOUT
    };
};