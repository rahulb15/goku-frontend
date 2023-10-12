import React, { Component } from "react";
import XwalletImg from "../../../../assets/swap-kaddex.png";

export default class Xwallet extends Component {
  render() {
    return (
      <div className="xwalletOuter">
        <div className="container">
          <div className="stepBx">
            <i></i>
            <span>5</span>
          </div>
          <div className="mainHd">
            <h3 className="bold">eckoWALLET</h3>
            <h2 className="extrabold">
              Get Fast Access To Liquidity, With Support From Our Partners At{" "}
              <span>Kaddex</span>
            </h2>
          </div>
          <div className="xwalletCont">
            <p>
              Improve your Swapping skills with the support of our partners at
              Kaddex. Get priority access to Liquidity Pools and Pairs launching
              on Kryptomerch. Integrate through Kaddex X-Wallet to gain access
              to a flawless Kadena experience.
            </p>
            <button>Read More</button>
          </div>
          <div className="xwalletImg">
            <img src={XwalletImg} alt="" />
          </div>
        </div>
      </div>
    );
  }
}
