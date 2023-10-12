import React, { Component } from "react";
//import { Button } from "reactstrap";
import { FaTshirt } from "react-icons/fa";
import mrkpaboutImg1 from "../../../../../assets/mrkplc-about-img1.png";
import mrkpaboutImg2 from "../../../../../assets/mrkplc-about-img2.png";
import mrkpaboutImg3 from "../../../../../assets/mrkplc-about-img3.png";
import mrkpaboutImg4 from "../../../../../assets/mrkplc-about-img4.png";
//Owl Carousel Libraries and Module
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
//Owl Carousel Settings
const options = {
  responsiveClass: true,
  nav: true,
  autoplay: false,
  navText: ["Prev", "Next"],
  smartSpeed: 1000,
  loop: true,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 2,
    },
    600: {
      items: 2,
    },
    700: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
};
export default class MpCrousal extends Component {
  render() {
    return (
      <div>
        <div className="carousalOuter">
          <OwlCarousel className="slider-items owl-carousel" {...options}>
            <div className="item" style={{ marginRight: "25px" }}>
              {/* <div className="backGroundGlow glow"> */}
              <div className="featItemBx">
                <div className="glow">
                  <div className="featImg">
                    <img src={mrkpaboutImg1} alt="" />
                    <div className="tshirtIcon" style={{ marginRight: "25px" }}>
                      <FaTshirt />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "25px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="featImg">
                    <img src={mrkpaboutImg2} alt="" />
                    <div className="tshirtIcon" style={{ marginRight: "25px" }}>
                      <FaTshirt />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "25px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="featImg">
                    <img src={mrkpaboutImg3} alt="" />
                    <div className="tshirtIcon" style={{ marginRight: "25px" }}>
                      <FaTshirt />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "25px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="featImg">
                    <img src={mrkpaboutImg4} alt="" />
                    <div className="tshirtIcon" style={{ marginRight: "25px" }}>
                      <FaTshirt />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "25px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="featImg">
                    <img src={mrkpaboutImg1} alt="" />
                    <div className="tshirtIcon" style={{ marginRight: "25px" }}>
                      <FaTshirt />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
        <div className="seeall">
          <a href="/marketplace/nft-projects">See All Projects</a>
        </div>
      </div>
    );
  }
}
