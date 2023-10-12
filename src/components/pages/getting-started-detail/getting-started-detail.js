import React, { Component } from "react";
import { Link } from "react-router-dom";
import WOW from "wowjs";
import Footer from "../../common-components/footer/footer";
import { Header } from "../../common-components/header/header";
import FaqDetailTab from "./getting-started-detail-tab";
import "./getting-started-detail.scss";

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
            <div className="faqDetail_Outer">
              <FaqDetailTab />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
