import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignupPage from './signup/page';
import LoginPage from './login/page';

const App = () => (
  <Router>
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      {/* Add other routes here */}
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
