import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default class MintTrade extends Component {
  render() {
    return (
      <div id="slide3">
        <div className="container">
          <div className="stepBx">
            <i></i>
            <span>2</span>
          </div>
          <div className="mainHd">
            <h3 className="bold">Launchpad</h3>
            <h2 className="extrabold">
              Mint, Trade, And Collect Your Favorite Nfts At Your Favorite
              Launchpad And Marketplace.
            </h2>
            <p>
              State-of-the-art NFT Launchpad and Marketplace on Kadena with
              integration into our Play to Earn Gaming Metaverse
            </p>
          </div>
          <div className="comingSoon">
            <Link to="/marketplace">
              {" "}
              <Button className="medium">Marketplace</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
