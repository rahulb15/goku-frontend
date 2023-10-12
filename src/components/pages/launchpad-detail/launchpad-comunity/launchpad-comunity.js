import React, { Component } from "react";
//import AboutBanImg from '../../../../assets/about-bannerImg.png'

export default class LaunchpadAbout extends Component {
  render() {
    return (
      <div id="slide3">
        <div className="aboutLaunchpadOuter">
          <div className="container">
            <div className="stepBx">
              <i></i>
              <span>2</span>
            </div>
            <div className="mainHd">
              <h3 className="bold">Project</h3>
              <h2 className="extrabold">Community</h2>
            </div>
            <div className="aboutLaunchCont">
              <div className="aboutCont">
                <p>
                  We've been committed to community since becoming Kadena's #1
                  NFT project. Our coopers have kept the heist alive and
                  provided us fresh ideas, making us Kadena's bluechip NFT
                  project. Lets Make Kadena Great Together! What's Kadena?
                  Kadena is the most scalable, secure, and decentralized
                  blockchain.
                </p>
                <p>
                  Coopers has been our first priority, and we've rewarded real
                  supporters with Whitelist, Free Mints, and Free kadena for
                  promoting the project on social media. Whitelist Giveaway
                  partners with top kadena initiatives. Token participants will
                  receive 30 $KDA in free NFT Mints.
                </p>
              </div>
              <div className="aboutCont">
                <p>
                  We value strong internal and external eco-partners. We were
                  supported by Kryptomerch's visionary staff. We intend to
                  continue AMAs on project construction with the Kadena
                  community. We love decluttering Kadena.
                </p>
                <p>
                  Our goal is to fully represent the coopers by carrying out
                  their ideas for the project going forward, such as running
                  polls on our social space to get their opinion, rewarding
                  royalties to each DBC NFT owner, blockchain game integration
                  with Kryptomerch's Play to earn Metaverse, and many more
                  brilliant ideas our coopers can dream of.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
