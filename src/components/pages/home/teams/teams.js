import React, { Component } from "react";
import TeamCarousal from "./team-carousal";

export default class Toknomics extends Component {
  render() {
    return (
      <div>
        <div className="teamsOuter" id="slide6">
          <div className="container">
            <div className="stepBx">
              <i></i>
              <span>5</span>
            </div>
            <div className="mainHd">
              <h3 className="bold">Creative Minds</h3>
              <h2 className="extrabold">Meet Our Team</h2>
            </div>
            <TeamCarousal />
          </div>
        </div>
      </div>
    );
  }
}
