import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Provider } from "react-redux";
import axios from "axios";

import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";
import AuthRoute from "./util/AuthRoute";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <div className="App">
          <Router>
            <NavBar />
            <div>
              <Switch>
                <Route path="/" exact component={Home} />
                <AuthRoute path="/login" exact component={Login} />
                <AuthRoute path="/signup" exact component={SignUp} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default App;
