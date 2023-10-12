import React, { Component } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { Button } from "reactstrap";
import Moblogo from "../../../assets/LogoIcon.png";
import LogoWhite from "../../../assets/logo-white.png";
import Logo from "../../../assets/logo.png";
import ConnectPopup from "../../pages/home/connect-wallet-popup/connect-wallet-popup";
import MarketplaceNav from "./marketplacenav";

import "./marketplace-header.scss";

export default class MarketplaceHeader extends Component {
  componentDidMount() {
    window.onscroll = function () {
      myFunction();
    };
    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
  }

  render() {
    return (
      <>
        <header id="myHeader">
          <div className="container">
            <div className="hdrInn mktplcHdr">
              <div className="logoBx">
                <Link to="/">
                  <img src={Logo} alt="" className="webLogo logoblack" />
                  <img src={Moblogo} alt="" className="MobLogo" />
                  <img className="logowhite" src={LogoWhite} alt="" />
                </Link>
              </div>
              {/* <div className='logoBx'><a href='/'><img src={Logo} alt='' className='webLogo logoblack' /><img src={Moblogo} alt='' className='MobLogo' /><img className='logowhite' src={LogoWhite} alt='' /></a></div> */}
              <div className="menuBx">
                <div className="hdrtokenBx">
                  <div className="conPopupBtn">
                    <ConnectPopup />
                  </div>
                  <div className="cartBx">
                    <Button className="CartBtn">
                      <BsFillCartFill />
                    </Button>
                  </div>
                  <div className="menuBtn">
                    <MarketplaceNav />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}
