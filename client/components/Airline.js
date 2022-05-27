import React, { Component } from "react";
import { connect } from "react-redux";
import ShareIcon from "@material-ui/icons/share";
import IconButton from "@material-ui/core/IconButton";

class Airline extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    if (navigator.canShare) {
      console.log("Congrats! Your browser supports Web Share API");
      navigator
        .share({
					subject: 'Fly with Fly',
					text: 'This is hot deal and do not miss it!!' + 'Travel with Fly and Savannah',
					url: `fly.com/${this.props.product.id }`
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
         		console.log("Error while using Web share API:");
            console.log(error);
        });
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
    }
  };
  render() {
    const { product } = this.props;
    const { handleClick } = this;
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
          <IconButton id="shareButton" onClick={() => handleClick()}>
            <ShareIcon />
          </IconButton>
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
