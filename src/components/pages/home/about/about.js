import React, { Component } from "react";
import AboutImgDark from "../../../../assets/about-img-dark.png";
import AboutImg from "../../../../assets/about-img.png";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="about_outer" id="slide2">
          <div className="container">
            <div className="stepBx">
              <i></i>
              <span>1</span>
            </div>
            <div className="mainHd">
              <h3 className="bold">Kryptomerch</h3>
              <h2 className="extrabold">About Us</h2>
            </div>
            <div className="aboutContent">
              <div className="about_Left">
                <p>
                  Kryptomerch is the first NFT-based merchandising store and
                  marketplace, providing easy access to a wide range of
                  high-quality products with lightning-fast shipping. Users will
                  be able to sell their NFT-based merchandise on our
                  marketplace, allowing them more utility with their NFTs.
                  Kryptomerch will serve as a launchpad for NFT projects,
                  allowing the Metaverse to expand.
                </p>
                <i>
                  <img src={AboutImg} className="aboutlightImg" alt="" />
                  <img className="aboutdarkImg" src={AboutImgDark} alt="" />
                </i>
              </div>
              <div className="about_Right medium">
                <p>
                  NFT projects will be able to build and integrate their own
                  DAPPs within the gamified environment provided by Kryptomerch
                  within this growing Metaverse. This allows projects to gain
                  traction and expand their reach, while also providing KDM
                  protocol users with additional opportunities to generate yield
                  in the form of Its cross-protocol rewards
                </p>
                <h3 className="extrabold">NFT Merchandising & Marketplace</h3>
                <p>
                  The most exciting combination of NFTs and Merchandising.
                  Design your own Merch, sell to other users on our Marketplace,
                  earn rewards and utilize your NFTs effectively.
                </p>
                <h3 className="extrabold">NFT Launchpad & Marketplace</h3>
                <p>
                  Create, trade, and bid on NFTs on our Marketplace. Join the
                  Kryptomerch Metaverse by collaborating with us on your next
                  NFT project.
                </p>
                <h3 className="extrabold">P2E Gaming</h3>
                <p>
                  Earn KDM by playing games. Utilize our in-game merchandising
                  feature to customise your character. Sell the same to other
                  metaverse users. Increase your rewards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
