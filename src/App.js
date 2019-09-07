import React, { Component } from 'react';
import MyProfile from './containers/Profile/MyProfile';
import HomePage from './containers/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Trips from './containers/Trips';
import BookingTrip from './containers/BookingTrip';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

class App extends Component {
    render() {
        if (localStorage && !localStorage.getItem('auth')) return;

        const decoded = jwtDecode(localStorage.getItem('auth'));
        if (Date.now() / 1000 <= decoded.exp) {
            axios.defaults.headers.common[
                'token'
            ] = localStorage.getItem('auth');
        }

        return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/trips/search" component={Trips} />
                        <Route path="/booking-trip/:id" component={BookingTrip} />
                        <Route path="/profile" exact component={MyProfile} />
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
