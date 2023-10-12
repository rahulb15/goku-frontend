import React, { Component } from "react";

export default class PastProjects extends Component {
  render() {
    return (
      <div className="marketplaceOuterBx" id="slide5">
        <div className="container">
          <div className="stepBx">
            <i></i>
            <span>4</span>
          </div>
          <div className="mainHd">
            <h3 className="bold">Launchpad</h3>
            <h2 className="extrabold">
              Your Gateway To The Best NFT Launchpad And Marketplace On{" "}
              <span>Kadena</span>
            </h2>
          </div>
        </div>
        <div className="marketplaceOuter">
          <div className="markplaceInn">
            <div className="container">
              <div className="markplaceLeft">
                <h2>NFT Launchpad</h2>
                <p>
                  Each project that launches with Kryptomerch will have its own
                  personality, distinct from others, and will be integrated into
                  our play to earn gaming metaverse.
                </p>
              </div>
              <div className="markplaceLeft">
                <h2>NFT Marketplace</h2>
                <p>
                  Based on Marmalade standards, Kryptomerch's NFT marketplace is
                  a beauty of another standard. Soon you will be able to mint,
                  trade and collect your favorite NFTs. You can also get them
                  printed on any merchandise right from our Marketplace and
                  Launchpad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
