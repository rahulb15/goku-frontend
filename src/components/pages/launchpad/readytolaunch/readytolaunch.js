import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Readytolaunch extends Component {
  render() {
    return (
      <div className="readytolaunchOuter" id="slide6">
        <div className="container">
          <div className="stepBx">
            <i></i>
            <span>5</span>
          </div>
          <div className="mainHd">
            <h3 className="bold">Apply</h3>
            <h2 className="extrabold">
              Ready To Launch Your Project With <span>Kryptomerch?</span>
            </h2>
          </div>
          <div className="xwalletCont">
            <Link to="/contact">
              {" "}
              <button>Contact Us</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
