import React from "react";
import { Button } from "reactstrap";
import ToknoIcon from "../../../assets/krypto-icon.png";
import Pdf from "../../../assets/litepaper.pdf";
import Footer from "../../common-components/footer/footer";
import { Header } from "../../common-components/header/header";
import RangeSlider from "../../pages/toknomics/range-slider";
import Countdowntimer from "./countdown";
import "./toknomics.scss";

const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
const GAS_PRICE = 0.01111;
const GAS_LIMIT = 150000;
const TTL = 28000;
const CHAIN_ID = "1";
const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const API_HOST = `https://api.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;

const Toknomics = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="toknomicsOuter">
          <div className="toknomics_Left">
            <h2 className="extrabold">Kryptomerch</h2>
            <h2 className="extrabold">Tokenomics</h2>
            <a href={Pdf} target="_blank">
              {" "}
              <Button>Litepaper</Button>
            </a>
          </div>
          <div className="toknomics_Right">
            <h2 className="bold">ICO Ends In</h2>
            <div className="countdownOuter">
              <Countdowntimer />
            </div>
            <div className="walletBal">
              Wallet Balance: <strong>1,426 KDA</strong>
            </div>
            <div className="rangeslider">
              {/* <img src={RangeImg} alt="" /> */}
              <RangeSlider />
            </div>
            <div className="tokenValue">
              <input type="text" name="name" placeholder="0 KDM" alt="" />
              <img src={ToknoIcon} alt="" />
            </div>
            <div className="walletBal">
              Wallet Balance: <strong>12 KDM per KDA</strong>
            </div>
            <div className="buytokenBtn">
              <Button>Buy Token</Button>
            </div>
            <div className="tokenworthOut">
              <div className="tokenwrthLeft">
                <strong>$00</strong>
                <span>Worth of tokens</span>
              </div>
              <div className="tokenwrthRight">
                <strong>00</strong>
                <span>KDA Raised</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Toknomics;
