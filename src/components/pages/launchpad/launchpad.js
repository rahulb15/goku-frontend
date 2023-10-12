import React, { Component } from "react";
import Footer from "../../common-components/footer/footer";
import HeaderInner from "../../common-components/header-inner/header-inner";
import LaunchpadBanner from "./launchpad-banner/launchpad-banner";
import "./launchpad.scss";
import Marketplace from "./marketplace/marketplace";
import MintTrade from "./mint-trade/mint-trade";
import PastProjects from "./past-projects/past-projects";
import UpcomingProjects from "./upcoming-projects/upcoming-projects";
// import XwalletImg from './xwallet/xwallet'
import LaunchpadBullets from "./launchpad-bullets/launchpad-bullets";
import Readytolaunch from "./readytolaunch/readytolaunch";

export default class Launchpad extends Component {
  render() {
    return (
      <div>
        <HeaderInner />
        <LaunchpadBanner />
        <UpcomingProjects />
        <MintTrade />
        <PastProjects />
        <Marketplace />
        {/* <XwalletImg /> */}
        <Readytolaunch />
        <Footer />
        <LaunchpadBullets />
      </div>
    );
  }
}
