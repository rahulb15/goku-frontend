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
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const KEY_PAIR = {
  publicKey: "260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586",
  secretKey: "4aaeb090601faa327e37b1ec26b7adca1469e25ccd776e33776496edc860d383",
};
const KP = {
  publicKey: "057644c6dc3da0b6e5c695508afd24198171577802fcaaa351ae77bc0f2244c1",
  secretKey: "e5b9aafbfafb4998ef3e2bfd5cc2671f6306258d34e4b8963ea9dea1e855884d",
};

const KPTWO = {
  publicKey: "fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934",
  secretKey: "a0c28907dce337e1d11042a4169615f5609be1204d847cdf68974f5c8a55df80",
};

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
