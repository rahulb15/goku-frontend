import React, { Component } from "react";
import launchpadteamImg1 from "../../../../../src/assets/launchpadteam1.png";
import launchpadteamImg2 from "../../../../../src/assets/launchpadteam2.png";
import launchpadteamImg3 from "../../../../../src/assets/launchpadteam3.png";

export default class LaunchTeamCarousal extends Component {
  render() {
    return (
      <div>
        <div className="carousalOuter teamsList">
          <div className="item">
            <i>
              <img src={launchpadteamImg1} alt="" />
            </i>
            <span className="bold">Crypto Cooper</span>
            <small>Kadena OG &amp; Founder</small>
          </div>
          <div className="item">
            <i>
              <img src={launchpadteamImg2} alt="" />
            </i>
            <span className="bold">Krypto Girl</span>
            <small>Backend</small>
          </div>
          <div className="item">
            <i>
              <img src={launchpadteamImg3} alt="" />
            </i>
            <span className="bold">KDA Sloth</span>
            <small>NFT &amp; Game</small>
          </div>
        </div>
      </div>
    );
  }
}
