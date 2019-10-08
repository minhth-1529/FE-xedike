import { combineReducers } from 'redux';
import { Trips } from './Trip/reducer';
import { SearchTrips } from './SearchTrip/reducer';
import { Authenticate } from './Auth/reducer';
import { Provinces } from './Province/reducer';
import { UserInfo } from './User/reducer';
import { Cars } from './Car/reducer';

export const rootReducers = combineReducers({
    Trips,
    Authenticate,
    Provinces,
    UserInfo,
    Cars,
    SearchTrips
});
