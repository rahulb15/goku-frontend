import React, { Component } from "react";
import PartnerCarousal from "./partner-carousal";

export default class Toknomics extends Component {
  render() {
    return (
      <div>
        <div className="teamsOuter" id="slide7">
          <div className="container">
            <div className="stepBx">
              <i></i>
              <span>6</span>
            </div>
            <div className="mainHd">
              <h3 className="bold">We Work With</h3>
              <h2 className="extrabold">Our Partners</h2>
            </div>
            <PartnerCarousal />
          </div>
        </div>
      </div>
    );
  }
}
