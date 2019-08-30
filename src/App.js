import React from 'react';
import MyProfile from 'containers/Profile/MyProfile';
import HomePage from 'containers/HomePage';
import Header from 'components/Header';
import Trips from './containers/Trips';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
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

export default App;
