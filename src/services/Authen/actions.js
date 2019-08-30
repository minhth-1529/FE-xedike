import { AUTHEN_LOGIN } from './actionTypes';

export const authenLogin = payload => {
    return {
        type: AUTHEN_LOGIN,
        payload
    };
};