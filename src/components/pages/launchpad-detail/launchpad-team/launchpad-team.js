import React, { Component } from "react";
import TeamCarousal from "../../home/teams/team-carousal";
import LaunchTeamCarousal from "./launch-team-carousal";
export default class LaunchpadTeam extends Component {
  render() {
    return (
      <div id="slide4">
        <div className="blockchain_outer">
          <div className="container">
            <div className="stepBx_teams">
              <i></i>
              {this.props.projectName == "DB cooper" ? (
                <span>4</span>
              ) : (
                <span>3</span>
              )}
            </div>
            <div className="mainHd_teams">
              <h3 className="bold">Project</h3>
              <h2 className="extrabold">Team</h2>
            </div>
            <div className="launch_teamsOuter">
              {this.props.projectName == "DB cooper" ? (
                <LaunchTeamCarousal />
              ) : (
                <TeamCarousal />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
