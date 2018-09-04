import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/config/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/navbars/Navbar";
import Footer from "./components/footers/Footer";
import Landing from "./components/layout/Layout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Theaters from "./components/theaters/Theaters";
import TheaterContainer from "./components/theater/TheaterContainer";
import HallContainer from "./components/hall/HallContainer";
import Movies from "./components/movies/Movies";
import MovieContainer from "./components/movie/MovieContainer";
import ShowsContainer from "./components/shows/ShowsContainer";
import Show from "./components/show/ShowContainer";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/theaters" component={Theaters} />
              <Route exact path="/theaters/:id" component={TheaterContainer} />
              <Route
                exact
                path="/theaters/:id/halls/:hall_id"
                component={HallContainer}
              />
              <Route exact path="/movies" component={Movies} />
              <Route exact path="/movies/:id" component={MovieContainer} />
              <Route exact path="/shows" component={ShowsContainer} />
              <Route exact path="/shows/:id" component={Show} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
