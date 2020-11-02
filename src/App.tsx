import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { RouteComponentProps, withRouter } from 'react-router';
import {api} from './api/api';
import {UserModel} from './api/models/User';
import {SignUp} from './components/SignUpForm';
import {SignIn} from './components/SignInForm';
import {Profile} from './components/Profile';
import './App.css';

export const App: React.FC = () => {
    const [users, setUsers] = React.useState<UserModel[]>([]);

    React.useEffect(() => {
        api.getUsers()
            .then(items => {
                setUsers(items);
        });
    }, []);

    return (
        <Switch>
            <Route exact path="/" component={SignIn}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
        </Switch>
    );

}

export default App;
