import { combineReducers } from 'redux';
import { Trips } from './Trip/reducer';
import { Authenticate } from './Authen/reducer';

export const rootReducers = combineReducers({
    Trips,
    Authenticate
});
