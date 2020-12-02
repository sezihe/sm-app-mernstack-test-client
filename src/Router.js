import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// routes Components
import Home from './core/Home';
import SignUp from './user/signup/SignUp';

const App = () => {
    return (
        <Router>
            {/* switch searches through it's childern and selects the one that matches the URL*/}
            <Switch>
                <Route exact path="/"> <Home /> </Route>
                <Route path="/auth/signup"> <SignUp /> </Route>
                {/*more routes can be added*/}
            </Switch>
        </Router>
    )
}

export default App;