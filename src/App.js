import React from 'react';
import MyProfile from './containers/Profile/MyProfile';
import DriverProfile from './containers/Profile/DriverProfile';
import HomePage from './containers/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './containers/Search';
import BookingTrip from './containers/BookingTrip';
import HistoryTrips from './containers/HistoryTrip'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
if (localStorage && localStorage.getItem('auth')) {
    const decoded = jwtDecode(localStorage.getItem('auth'));
    if (Date.now() / 1000 <= decoded.exp) {
        axios.defaults.headers.common['token'] = localStorage.getItem('auth');
    }
}
const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/trips/search" component={Search} />
                    <Route path="/booking-trip/:id" component={BookingTrip} />
                    <Route path="/my-profile" exact component={MyProfile} />
                    <Route path="/history-trips" exact component={HistoryTrips} />
                    <Route
                        path="/driver-profile/:id"
                        component={DriverProfile}
                    />
                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default App;
