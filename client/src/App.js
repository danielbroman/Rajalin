import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';

import './App.css';
import setAuthToken from './utils/setAuthToken';

import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateContract from './components/create-contract/CreateContract';
import ContractEdit from './components/edit-contract/ContractEdit';
import PrivateRoute from './components/common/PrivateRoute';
import Configurator from './components/configurator/configurator';
import AdminRoute from './components/common/AdminRoute';
import Contracts from './components/Contract/Contracts';
import Contract from './components/Contract/Contract';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                path="/create-contract"
                component={CreateContract}
              />
            </Switch>
            <Switch>
              <PrivateRoute path="/edit-contract" component={ContractEdit} />
            </Switch>
            <Switch>
              <PrivateRoute path="/contract/:id" component={Contract} />
            </Switch>
            <Switch>
              <AdminRoute path="/configurator" component={Configurator} />
            </Switch>
            <Switch>
              <AdminRoute path="/all-contracts" component={Contracts} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
