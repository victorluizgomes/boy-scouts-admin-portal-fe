import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "../pages/Home";
import CreateAlert from "../pages/CreateAlert";
import CreateCampDescription from "../pages/CreateCampDescription";
import PasswordPage from "../pages/PasswordPage";
import Navigation from "../components/Navigation";
import { useAuth } from "../context/AuthContext";

const Routes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {isAuthenticated ? <Navigation /> : null}
      <div className="page-container-wrapper">
        <div className="page-container">
          <Switch>
            <Route path="/" exact>
              {isAuthenticated ? <Home /> : <Redirect to="/password" />}
            </Route>
            <Route path="/alert">
              {isAuthenticated ? <CreateAlert /> : <Redirect to="/password" />}
            </Route>
            <Route path="/camp-description">
              {isAuthenticated ? <CreateCampDescription /> : <Redirect to="/password" />}
            </Route>
            <Route path="/password">
              {isAuthenticated ? <Redirect to="/" /> : <PasswordPage />}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Routes;
