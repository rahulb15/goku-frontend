import React, { Component } from "react";
import teamImg1 from "../../../../../src/assets/team-img1.png";
import teamImg2 from "../../../../../src/assets/team-img2.png";
import teamImg3 from "../../../../../src/assets/team-img3.png";
import teamImg4 from "../../../../../src/assets/team-img4.png";
import teamImg5 from "../../../../../src/assets/team-img5.png";
import teamImg6 from "../../../../../src/assets/team-img6.png";
//Owl Carousel Libraries and Module
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
//Owl Carousel Settings
const options = {
  responsiveClass: true,
  nav: false,
  autoplay: true,
  navText: ["Prev", "Next"],
  smartSpeed: 1000,
  loop: true,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    700: {
      items: 3,
    },
    1000: {
      items: 5,
    },
  },
};
export default class ProjectCrousal extends Component {
  render() {
    return (
      <div>
        <div className="carousalOuter teamsList">
          <OwlCarousel className="slider-items owl-carousel" {...options}>
            <div className="item">
              <i>
                <img src={teamImg1} alt="" />
              </i>
              <span className="bold">kryptovfx</span>
              <small>Lead Designer</small>
            </div>
            <div className="item">
              <i>
                <img src={teamImg2} alt="" />
              </i>
              <span className="bold">kryptogal</span>
              <small>Chief Operations Officer</small>
            </div>
            <div className="item">
              <i>
                <img src={teamImg3} alt="" />
              </i>
              <span className="bold">kryptoguy</span>
              <small>Advisor</small>
            </div>
            <div className="item">
              <i>
                <img src={teamImg4} alt="" />
              </i>
              <span className="bold">kryptoboss</span>
              <small>Backend Engineer</small>
            </div>
            <div className="item">
              <i>
                <img src={teamImg5} alt="" />
              </i>
              <span className="bold">kryptofudd</span>
              <small>Community Manager</small>
            </div>
            <div className="item">
              <i>
                <img src={teamImg6} alt="" />
              </i>
              <span className="bold">Blacklisted</span>
              <small>Chief Executive Officer</small>
            </div>
          </OwlCarousel>
        </div>
      </div>
    );
  }
}
