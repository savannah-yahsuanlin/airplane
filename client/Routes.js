import React, { Component } from "react";
import { connect } from "react-redux";
import { loadProducts, filterProducts, searchProducts } from "./store";

class Routes extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.loadProducts();
    this.props.filterProducts();
    this.props.searchProducts();
  }

  onChange = async (e) => {
    const alliance = e.target.value;
    const checked = e.target.checked;
    this.props.filterProducts(alliance, checked);
  };

  handleSearch(e) {
    const searchName = e.target.value;
    const dataSearch = products.filter((product) => {
      if (product.name) {
        return product.name.toLowerCase().includes(searchName.toLowerCase());
      }
    });
    this.props.searchProducts(dataSearch);
  }

  render() {
    const { products } = this.props;
    const { onChange, handleSearch } = this;
    return (
      <div>
        <div className="header">
          <img className="fly" src="./images/Fly.png" />
        </div>
        <main>
          <h1>Airlines</h1>
          <p className="filter">Filter by Alliances</p>
          <form>
            <input type="checkbox" onChange={onChange} name="ow" value="OW" />
            <label>One World</label>
            <input type="checkbox" onChange={onChange} name="st" value="ST" />
            <label>Sky Team</label>
            <input type="checkbox" onChange={onChange} name="sa" value="SA" />
            <label>Star Alliance</label>
          </form>
          <form>
            <input
              type="text"
              name="search"
              onChange={handleSearch}
              placeholder="search airplane"
            />
          </form>
          <ul className="boxes">
            {[
              ...new Set(
                products.map((product) => {
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
                })
              ),
            ]}
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
    filterProducts: (alliance, checked) => {
      dispatch(filterProducts(alliance, checked));
    },
    searchProducts: (search) => {
      dispatch(searchProducts(search));
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);
