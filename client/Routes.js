import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import Airlines from "./components/Airlines";
import Airline from "./components/Airline";
import { loadProducts, filterProducts} from "./store";



class Routes extends Component {
  componentDidMount() {
    this.props.loadProducts();
    this.props.filterProducts();
  }

  render() {
    return (
				<Switch>
					<Route exact path="/" component={Airlines}/>
					<Route exact path="/:id" component={Airline} />
					<Route exact path="/search/:search?" component={Airlines} />
				</Switch>
    );
  }
}

const mapState = ({ products }) => {
  return {
    products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadProducts: () => {
      dispatch(loadProducts());
    },
    filterProducts: (alliance, checked) => {
      dispatch(filterProducts(alliance, checked));
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
