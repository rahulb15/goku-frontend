import React, { Component } from "react";
import { Link } from "react-router-dom";
import WOW from "wowjs";
import Footer from "../../common-components/footer/footer";
import { Header } from "../../common-components/header/header";
import "./getting-started.scss";

export default class Toknomics extends Component {
  componentDidMount() {
    new WOW.WOW().init();
  }
  render() {
    return (
      <div>
        <Header />
        <div className="faqOuter">
          <div className="container">
            <div className="breatcrum">
              <Link to="/">Kryptomerch</Link> &nbsp;&bull;&nbsp;{" "}
              <span>Getting Started</span>
            </div>
            <div className="faqHd">
              <h2 className="bold">Getting Started</h2>
            </div>
            <div className="faqList">
              <ul>
                <li>
                  <a href="/getting-started-detail">What is a wallet?</a>
                </li>
                <li>
                  <a href="/">Navigating Kryptomerch</a>
                </li>
                <li>
                  <a href="/">What is a Non-Fungible Token (NFT)?</a>
                </li>
                <li>
                  <a href="/">What is a crypto wallet?</a>
                </li>
                <li>
                  <a href="/">What currencies can I use on Kryptomerch?</a>
                </li>
                <li>
                  <a href="/">How do I purchase Kadena (KDA)?</a>
                </li>
                <li>
                  <a href="/">What are service and creator fees?</a>
                </li>
                <li>
                  <a href="/">How do I search for NFTs?</a>
                </li>
                <li>
                  <a href="/">
                    How do I log out of my Kryptomerch account or switch crypto
                    wallets?
                  </a>
                </li>
                <li>
                  <a href="/">What if my wallet is not connecting?</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
