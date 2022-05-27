import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Airlines from "./components/Airlines";
import Airline from "./components/Airline";
import { Login } from "./components/AuthForm";
import { loadProducts, filterProducts, me } from "./store";
import Home from './components/Home';

class Routes extends Component {

  componentDidMount() {
    this.props.loadProducts();
    this.props.filterProducts();
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn} = this.props;
    const token = window.localStorage.getItem("token");
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/airlines" component={Airlines} />
            <Route exact path="/:id" component={Airline} />
            <Route path="/search/:search?" component={Airlines} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
          </Switch>
        )}
       
      </div>
    );
  }
}

const mapState = (state) => {
  const products = state.products;
  return {
    products,
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
    auth: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => {
      dispatch(loadProducts()), dispatch(me());
    },
    filterProducts: (alliance, checked) => {
      dispatch(filterProducts(alliance, checked));
    },
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
