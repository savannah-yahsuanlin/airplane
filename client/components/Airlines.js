import React, { Component } from "react";
import { connect } from "react-redux";
import { loadProducts, filterProducts } from "../store";
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
  constructor(props) {
    super(props);
    this.state = {
      products: this.props.products,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch = (e) => {
    let value = e.target.value;
    let product = this.props.products.filter((product) => {
      return (
        !product.name.toLowerCase() || product.name.toLowerCase() === value
      );
    });
    console.log(product);
    this.props.loadProducts(product);
  };

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
              name="name"
              onChange={handleSearch}
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
            {[
              ...new Set(
                products.map((product) => {
                  return (
                    <div className="box" key={product.id}>
                      {product.isNew ? (
                        <div className="badgeNew">new</div>
                      ) : null}
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
                })
              ),
            ]}
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

const mapState = ({ products }, { match }) => {
  return {
    products,
    match,
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
  };
};

export default connect(mapState, mapDispatch)(Airlines);
