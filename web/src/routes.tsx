import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Redirect from './pages/Redirect';
import Stats from './pages/Stats';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/:code' component={Redirect} />
                <Route exact path='/:code/stats' component={Stats} />
                <Route path='/*' component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}