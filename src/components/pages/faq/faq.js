import React, { Component } from "react";
import { Link } from "react-router-dom";
import WOW from "wowjs";
import Footer from "../../common-components/footer/footer";
import { Header } from "../../common-components/header/header";
import "./faq.scss";

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
              <Link to="/">Home</Link> &nbsp;&bull;&nbsp; <span>Faq</span>
            </div>
            <div className="faqHd">
              <h2 className="bold">Frequently Asked Questions</h2>
            </div>
            <div className="faqList">
              <ul>
                <li>
                  <a href="/faq-detail/0">What is an NFT?</a>
                </li>
                <li>
                  <a href="/faq-detail/1">What is a blockchain?</a>
                </li>
                <li>
                  <a href="/faq-detail/2">
                    What are Proof of Work (PoW) and Proof of Stake (PoS)
                    blockchains?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/3">How can I contact kryptomerch?</a>
                </li>
                <li>
                  <a href="/faq-detail/4">What is a wallet? Do I need one?</a>
                </li>
                <li>
                  <a href="/faq-detail/5">
                    Where should I start looking for a good wallet?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/6">What are gas fees on Kadena?</a>
                </li>
                <li>
                  <a href="/faq-detail/7">What does an NFT cost?</a>
                </li>
                <li>
                  <a href="/faq-detail/8">How can I make a Kryptomerch NFT?</a>
                </li>
                <li>
                  <a href="/faq-detail/9">How do I buy a Kryptomerch NFT?</a>
                </li>
                <li>
                  <a href="/faq-detail/10">
                    Can I pay with a credit card on Kryptomerch?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/11">
                    In comparison to competing NFT marketplaces, what sets
                    Kryptomerch apart?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/12">What are Kryptomerch's fees?</a>
                </li>
                <li>
                  <a href="/faq-detai/13">
                    Which blockchains does Kryptomerch support?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/14">
                    I want this yellow badge too! How do I get verified?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/15">
                    Will I be entitled to royalties on secondary sales of my
                    NFTs if I mint them on Kryptomerch?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/16">How do i gift an NFT to someone?</a>
                </li>
                <li>
                  <a href="/faq-detail/17">
                    {" "}
                    Can I hide NFTsfrom my Kryptomerch profile?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/18">
                    NFTs apparently harm the environment. Your thoughts?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/19">
                    {" "}
                    My verification request was rejected. Can I reapply?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/20">
                    I bought an NFT from someone, but I think I was scammed.
                    What happened?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/21">
                    Is connecting my wallet toKryptomerch secure?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/22">
                    I think I minted duplicate NFTs. Is that even possible?
                  </a>
                </li>
                <li>
                  <a href="/faq-detail/23">Kryptomerch removed my NFT. Why?</a>
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
