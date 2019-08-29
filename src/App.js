import React from 'react';
import MyProfile from 'containers/Profile/MyProfile';
import HomePage from 'containers/HomePage';
import Header from 'components/Header';
import Trips from 'containers/Trips';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Header />
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                </Switch>
            </BrowserRouter>
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/profile" exact component={MyProfile} />
                        <Route path="/trips/search" component={Trips} />
                        {/* <Route path="/tasks" exact component={TaskList} />
                        <Route path="/add-task" exact component={TaskForm} />
                        <Route
                            path="/edit-task/:id"
                            exact
                            component={TaskForm}
                        />

                        <Route path="" component={PageNotFound} /> */}
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
