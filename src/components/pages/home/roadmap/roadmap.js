import React, { Component } from "react";

export default class Roadmap extends Component {
  render() {
    return (
      <div>
        <div className="roadmap_outer" id="slide3">
          <div className="roadmap_Bg"></div>
          <div className="container">
            <div className="stepBx">
              <i></i>
              <span>2</span>
            </div>
            <div className="mainHd">
              <h3 className="bold">Preview</h3>
              <h2 className="extrabold">Roadmap</h2>
            </div>
            <div className="roadmapList">
              <ul>
                <li>
                  <div className="roadmapLeft">
                    <i></i>
                    <div className="roadCont">
                      <h4 className="extrabold">Q4 - 2022</h4>
                      <ul>
                        <li>NFT Launchpad (Beta)</li>
                        <li>IDO</li>
                        <li>NFT Merchandising (Beta)</li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="roadmapRight">
                    <i></i>
                    <div className="roadCont">
                      <h4 className="extrabold">Q1 - 2023</h4>
                      <ul>
                        <li>NFT Marketplace</li>
                        <li>NFT Merchandising</li>
                        <li>NFT Launchpad</li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="roadmapLeft">
                    <i></i>
                    <div className="roadCont">
                      <h4 className="extrabold">Q2 - 2023</h4>
                      <ul>
                        <li>NFT Merchandising Marketplace</li>
                        <li>P2E Gaming (Beta)</li>
                        <li>Staking</li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="roadmapRight">
                    <i></i>
                    <div className="roadCont">
                      <h4 className="extrabold">Q3 - 2023</h4>
                      <ul>
                        <li>Cross Chain Wallet Integration</li>
                        <li>P2E Gaming Metaverse</li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
