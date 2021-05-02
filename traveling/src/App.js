import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import TravelList from './components/TravelList';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <PrivateRoute exact path="/protected" component={TravelList} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route component={Login} />
          <Route component={Logout} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
