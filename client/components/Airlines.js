import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { loadProducts, filterProducts, logout } from "../store";
import { Link } from "react-router-dom";

class Airlines extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      amountPerPage: 12,
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.props.loadProducts();
    this.props.filterProducts();
  }

  onChange = async (e) => {
    const alliance = e.target.value;
    const checked = e.target.checked;
    this.props.filterProducts(alliance, checked);
  };

  render() {
    const { products, search, match, history, handleClick, username, firstName } = this.props;
    const { onChange } = this;
    const { page, amountPerPage } = this.state;
    const indexOfLast = page * amountPerPage;
    const indexOfFirst = indexOfLast - amountPerPage;
    const currentProducts = products.slice(indexOfFirst, indexOfLast);
    const searched = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      search[name] = value;
      if(value) history.push(`/search/${JSON.stringify(search)}`)
      else history.push('/')
    };
    const previousPage = () => {
      if (page === 1) return
      else this.setState({ page: page - 1 })
    }
    const nextPage = () => {
      this.setState({ page: page + 1 })
     }
    return (
      <div>
        <div className="header">
          <a href="/"><img className="cloud" src="./images/cloud.png" /></a>
          <div className="searchContainer">
            <input
              id="search"
              type="text"
              name="name"
              value={match.params.name}
              onChange={searched}
              autoFocus={true}
              autoComplete="on"
              placeholder="search ..."
            />
          </div>
          <div className="header-content">
            <p>Welcome, {username || firstName}</p>
            <p><a href="#" onClick={handleClick}>
              Logout
            </a></p>
           </div>
        </div>
        <main>
          <form style={{display: 'flex',justifyContent: 'center'}}>
            <p className="filter">Filter by Alliances</p>
            <input type="checkbox" onChange={onChange} name="ow" value="OW" />
            <label>One World</label>
            <input type="checkbox" onChange={onChange} name="st" value="ST" />
            <label>Sky Team</label>
            <input type="checkbox" onChange={onChange} name="sa" value="SA" />
            <label>Star Alliance</label>
          </form>
          <ul className="boxes">
            {currentProducts.map((product) => {
              return (
                <div className="box" key={product.id}>
                  {product.isNew ? <div className="badgeNew">new</div> : null}
                  {product.isHotDeal ? (
                    <div className="badgeHotDeal">Hot Deal</div>
                  ) : null}
                  {product.isEditorChoice ? (
                    <div className="badgeEditorChoice">Editor Choice</div>
                  ) : null}
                  <div className="airplaneLogo">
                    <img src={product.logoURL} />
                  </div>
                  <div className="content">
                    <Link to={`/${product.id}`}>
                      <p className="content-name">{product.name}</p>
                    </Link>
                  </div>
                </div>
              );
            })}
          </ul>

        </main>
        <div className="pagination">
          <button onClick={() => previousPage() }>{'<'}</button>
          <span>{ page }</span>
          <button onClick={ () => nextPage() }>{'>'}</button>
        </div>
      </div>
    );
  }
}

const mapState = ({ auth, products }, { match } ) => {
  let search = match.params.search;
  if (search) {
    search = JSON.parse(search);
  }
  search = search || {};
  products = products.filter((product) => {
    return search.name === product.name.replace(/ /g, '').toLowerCase() || !search.name
  });
  return {
    products,
    search,
    username: auth.username,
    firstName: auth.firstName
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
    handleClick() {
      dispatch(logout())
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Airlines));
