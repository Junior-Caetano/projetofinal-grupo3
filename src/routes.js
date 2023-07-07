import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import FormLogin from './Login';

const Routes = () => (
<BrowserRouter>
    <Switch>
        <Route exact path="" component={FormLogin()} />

    </Switch> 
</BrowserRouter>
);