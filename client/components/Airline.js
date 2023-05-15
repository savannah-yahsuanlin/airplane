import React, { Component } from "react";
import { connect } from "react-redux";


class Airline extends Component {
  constructor() {
    super();
  }

  render() {
    const { product } = this.props;
    if (!product) return null;

    return (
      <div className="singular">
        <div className="boxes">
          <div className="box-singular">
            <img className="singular-img" src={product.logoURL} />
            <div className="content">
              {product.isHotDeal ? (
                <div className="badgeHotDeal">Hot Deal</div>
              ) : null}
              <ul>
                <li>
                  <b>{product.name}</b>
                </li>
                <li>${product.price}</li>
              </ul>
            </div>
            <div>
              <p>non stop</p>
            </div>
            <div>
              <p>1h 22m</p>
              <em>BOS‐EWR</em>
            </div>
            <div className="ctb">
              <li>seat left</li>
              <b>{product.seat}</b>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ products }, { match }) => {
  const product = products.find(
    (product) => product.id === match.params.id * 1
  );
  return {
    product,
  };
};

export default connect(mapState)(Airline);
