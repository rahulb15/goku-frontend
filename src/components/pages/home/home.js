import React, { Component } from "react";
import "./home.scss";
// import WOW from 'wowjs';
import Bullets from "../../common-components/bullets/bullets";
import Footer from "../../common-components/footer/footer";
import { Header } from "../../common-components/header/header";
import KryptomerchVideo from "./Kryptomerch-video/Kryptomerch-video";
import Aboutpact from "./about-pact/about-pact";
import About from "./about/about";
import Banner from "./banner/banner";
import Blockchain from "./blockchain/blockchain";
import Partners from "./partners/partners";
import Roadmap from "./roadmap/roadmap";
import Teams from "./teams/teams";

export default class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Banner />
        <About />
        <Roadmap />
        <Blockchain />
        <Aboutpact />
        {/* <Toknomics /> */}
        <Teams />
        <Partners />
        <KryptomerchVideo />
        <Footer />
        <Bullets />
      </div>
    );
  }
}
