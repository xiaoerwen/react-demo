import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Home from '@/view/Home';
import Main from '@/view/Main';

function RouterConfig() {
    return (
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/main" component={Main} />
        </Router>
    );
}

export default RouterConfig;
