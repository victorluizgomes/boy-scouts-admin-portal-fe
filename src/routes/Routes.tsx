import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import CreateAlert from '../pages/CreateAlert';
import CreateCampDescription from '../pages/CreateCampDescription';
import Navigation from '../components/Navigation';

const Routes: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <div className='page-container-wrapper'>
        <div className='page-container'>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/alert" component={CreateAlert} />
              <Route path="/camp-description" component={CreateCampDescription} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Routes;