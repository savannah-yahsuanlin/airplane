import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { loadProducts, filterProducts, logout } from "../store";
import { Link } from "react-router-dom";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerFontColor: "#fff",
  headerBgColor: "#1d9bf0",
};

class Airlines extends Component {
  constructor() {
    super();
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
    const searched = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      search[name] = value;
      history.push(search ? `/search/${JSON.stringify(search)}` : "/");
    };
    return (
      <div>
        <div className="header">
          <img className="fly" src="./images/Fly.png" />
          <div style={{marginRight:"20px"}}>
            <a>Welcome, {username || firstName}</a>
          </div>
          <a className="logout" href="#" onClick={handleClick}>
            Logout
          </a>
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
          <form autoComplete="on">
            <input
              type="text"
              name="name"
              value={match.params.name}
              onChange={searched}
              autoFocus={true}
              autoComplete="on"
              placeholder="search ..."
            />
          </form>
          <div style={{ marginBottom: "30px" }}>
            <a
              className="twitter-share-button"
              href="https://twitter.com/intent/tweet"
              data-text="Travel with fly"
              data-url="http://localhost:6600/"
              data-via="fly"
              data-related="twitterapi,twitter"
            >
              Tweet
            </a>
          </div>
          <ul className="boxes">
            {products.map((product) => {
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
        <div className="Chat">
          <ThemeProvider theme={theme}>
            <ChatBot
              recognitionEnable={true}
              floating={true}
              steps={[
                {
                  id: "1",
                  message: "Welcome to FLY! How can I help you today?",
                  trigger: "2",
                },
                {
                  id: "2",
                  user: true,
                  trigger: "3",
                },
                {
                  id: "3",
                  message: "Ok, please wait",
                  trigger: "4",
                },
                {
                  id: "4",
                  message:
                    "Thank you for waiting. Here are airlines you can chose",
                  delay: 2400,
                  trigger: "5",
                },
                {
                  id: "5",
                  options: [
                    { value: 1, label: "ANA", trigger: "7" },
                    { value: 2, label: "Delta", trigger: "7" },
                    { value: 3, label: "Emirates", trigger: "7" },
                  ],
                  trigger: "6",
                },
                {
                  id: "6",
                  user: true,
                  trigger: "7",
                },
                {
                  id: "7",
                  message:
                    "No problem. All information is ready and sent to your phone. Have a nice trip",
                  delay: 3600,
                },
              ]}
            />
          </ThemeProvider>
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
    return !search.name || search.name === product.name;
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
