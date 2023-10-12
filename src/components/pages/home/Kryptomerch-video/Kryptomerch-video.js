import React, { Component } from "react";

export default class KryptomerchVideo extends Component {
  render() {
    return (
      <div>
        <div className="blockchain_outer" id="slide8">
          <div className="container">
            <div className="stepBx">
              <i></i>
              <span>7</span>
            </div>
            <div className="mainHd">
              <h3 className="bold">Watch</h3>
              <h2 className="extrabold">Kryptomerch Video</h2>
            </div>
            <div className="kryptoVideoBx">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/MODr-J9hsMw"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
