import React, { Component } from "react";
export default class Roadmap extends Component {
  render() {
    return (
      <div id="slide3">
        <div className="roadmap_outer launchroadmap" id="slide3">
          <div className="roadmap_Bg"></div>
          <div className="container">
            <div className="stepBx">
              <i></i>
              {this.props.projectName == "DB cooper" ? (
                <span>3</span>
              ) : (
                <span>2</span>
              )}
            </div>
            <div className="mainHd">
              <h3 className="bold">Preview</h3>
              <h2 className="extrabold">Roadmap</h2>
            </div>
            {this.props.projectName == "DB cooper" ? (
              <div className="roadmapList">
                <ul>
                  <li>
                    <div className="roadmapLeft">
                      <i></i>
                      <div className="roadCont">
                        <h4 className="extrabold">Phase 1 - Q3 2022</h4>
                        <ul>
                          <li>Launch of Social Media</li>
                          <li>Release Tokenomics & Road map</li>
                          <li>Website Launch</li>
                          <li>IDO Launch On Website</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="roadmapRight">
                      <i></i>
                      <div className="roadCont">
                        <h4 className="extrabold">Phase 2 -Q4 2022</h4>
                        <ul>
                          <li>Dex Listing</li>
                          <li>Token Burn Event</li>
                          <li>Nft Project Launch On Kryptomerch.io</li>
                          <li>Marketing Starts</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="roadmapLeft">
                      <i></i>
                      <div className="roadCont">
                        <h4 className="extrabold">Phase 3 - Q1 2023</h4>
                        <ul>
                          <li>
                            Partnership With Influencers On Various Social Media
                            Platforms
                          </li>
                          <li>Listing On Coin-listing Websites</li>
                          <li>Nft Project Marketplace Trading</li>
                          <li>Merchandise Goes Live</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="roadmapRight">
                      <i></i>
                      <div className="roadCont">
                        <h4 className="extrabold">Phase 4 -Q2 2023</h4>
                        <ul>
                          <li>Staking </li>
                          <li>Game Teaser Launch</li>
                          <li>Game Launch On Kryptomerch P2e Platform</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="roadmapList">
                <ul>
                  <li>
                    <div className="roadmapLeft">
                      <i></i>
                      <div className="roadCont">
                        <h4 className="extrabold">Q4-2022</h4>
                        <ul>
                          <li>NFT Launchpad (Beta)</li>
                          <li>IDO</li>
                          <li>NFT Merchandising</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="roadmapRight">
                      <i></i>
                      <div className="roadCont">
                        <h4 className="extrabold">Q1-2023</h4>
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
                        <h4 className="extrabold">Q2-2023</h4>
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
                        <h4 className="extrabold">Q3-2023</h4>
                        <ul>
                          <li>Cross Chain Wallet Integration </li>
                          <li>P2E Gaming Metaverse</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
