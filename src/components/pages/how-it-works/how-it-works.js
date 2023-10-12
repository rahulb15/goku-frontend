//import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Footer from "../../common-components/footer/footer";
import { Header } from "../../common-components/header/header";
import "./how-it-works.scss";

const HowitWorks = () => {
  return (
    <div>
      <Header />
      <div className="faqOuter">
        <div className="container">
          <div className="breatcrum">
            <Link to="/">Kryptomerch</Link> &nbsp;&bull;&nbsp;{" "}
            <span>How it works</span>
          </div>
          <div className="faqHd">
            <h2 className="bold">How It Works</h2>
          </div>
          <div className="howListOuter">
            <div className="howitList">
              <h3>Getting Started</h3>
              <ul>
                <li>
                  <Link to="/">What is an NFT?</Link>
                </li>
                <li>
                  <Link to="/">
                    What are Proof of Work (PoW) and Proof of Stake (PoS)
                    blockchains?
                  </Link>
                </li>
                <li>
                  <Link to="/">What is a wallet? Why do I need one?</Link>
                </li>
                <li>
                  <Link to="/">How much does it cost to create an NFT?</Link>
                </li>
              </ul>
            </div>
            <div className="howitList">
              <h3>Using Kryptomerch</h3>
              <ul>
                <li>
                  <Link to="/">
                    Which blockchains does Kryptomerch support?
                  </Link>
                </li>
                <li>
                  <Link to="/">Why should I use Kadena on Kryptomerch?</Link>
                </li>
                <li>
                  <Link to="/">Why should I use Kadena on Kryptomerch?</Link>
                </li>
                <li>
                  <Link to="/">Why should I use Kadena on Kryptomerch?</Link>
                </li>
              </ul>
            </div>
            <div className="howitList">
              <h3>Safety, Security, and Policies</h3>
              <ul>
                <li>
                  <Link to="/">
                    Is connecting my wallet to Kryptomerch secure?
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    I bought an NFT from someone, but I think I was scammed.
                    What happened?
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    My verification request was rejected. Can I reapply?
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    What are your community rules and guidelines?
                  </Link>
                </li>
              </ul>
            </div>
            <div className="howitList">
              <h3>Safety, Security, and Policies</h3>
              <ul>
                <li>
                  <Link to="/">
                    I should have received KDA, but I didn’t. How do I claim it?
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    I think I minted duplicate NFTs. Is that even possible?
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    The Kryptomerch website isn’t working properly. Now what?
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    I think my NFT disappeared from Kryptomerch. Why?
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowitWorks;
