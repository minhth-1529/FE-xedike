import React, { Component } from 'react';
import MyProfile from 'containers/Profile/MyProfile';
import HomePage from 'containers/HomePage';
import Header from 'components/Header';
import Trips from './containers/Trips';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogin } from 'services/Auth/actions.js';

class App extends Component {
    componentDidMount() {
        if (localStorage && !localStorage.getItem('auth')) return;

        this.props.authLogin(JSON.parse(localStorage.getItem('auth')));
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/trips/search" component={Trips} />
                        <Route path="/profile" exact component={MyProfile} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authLogin: payload => {
            dispatch(authLogin(payload));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(App);
