import React, { Component } from "react";
import { connect } from "react-redux";

import { loadProducts, filterProducts } from "./store";

class Routes extends Component {
  constructor() {
    super();
    this.state = {
      filterValue: "",
      ow: false,
      sa: false,
      st: false,
    };
    this.filter = this.filter.bind(this);
  }

  componentDidMount() {
    this.props.loadProducts();
    this.props.filterProducts();
  }

  filter() {
    console.log("filter");
  }

  onChange(ev) {
    const change = {};
    change[ev.target.check] = ev.target.checked;
  }

  render() {
    const { products } = this.props;
    const { filterValue } = this.state;
    const { filter, onChange } = this;
    return (
      <div>
        <div className="header">
          <img className="fly" src="./images/Fly.png" />
        </div>
        <main>
          <h1>Airlines</h1>
          <p className="filter">Filter by Alliances</p>
          <form value={filterValue} onChange={filter}>
            <input type="checkbox" onChange={onChange} name="ow" />
            <label>Oneworld</label>
            <input type="checkbox" onChange={onChange} name="st" />
            <label>Sky Team</label>
            <input type="checkbox" onChange={onChange} name="sa" />
            <label>Star Alliance</label>
          </form>
          <ul className="boxes">
            {products.map((product) => {
              return (
                <div className="box" key={product.id}>
                  <div className="airplaneLogo">
                    <img src={product.logoURL} />
                  </div>
                  <div className="content">
                    <p className="content-name">{product.name}</p>
                    {/*<div className='content-inner'>
											{ product.alliance !=='none' ? <p className='alliance'>{product.alliance}</p> : ''}
											<p className='phone'>{product.phone}</p>
											<p className='site'>{product.site.split('www.')[1]}</p>
										</div> */}
                  </div>
                </div>
              );
            })}
          </ul>
        </main>
      </div>
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
    filterProducts: () => {
      dispatch(filterProducts());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);
