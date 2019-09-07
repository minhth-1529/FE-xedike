import { AUTH_LOGIN, AUTH_LOGOUT } from './actionTypes';
import jwtDecode from 'jwt-decode';

let initialState = {
    user: {},
    authenticate: false
};

const user =
    (localStorage.getItem('auth') && jwtDecode(localStorage.getItem('auth'))) ||
    {};
if (user) {
    if(Date.now()/1000 <= user.exp){
        initialState = {
            user: user,
            authenticate: true
        };
    }
}

export const Authenticate = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            localStorage.setItem('auth', action.payload);

            return {
                user: jwtDecode(action.payload),
                authenticate: true
            };

        case AUTH_LOGOUT:
            localStorage.removeItem('auth');

            return {
                user: {},
                authenticate: false
            };
        default:
            return state;
    }
};
