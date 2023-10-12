import React, { Component } from "react";
import { FaTshirt } from "react-icons/fa";
import MrchendImg1 from "../../../../../assets/marchendies-img1.png";
import MrchendImg2 from "../../../../../assets/marchendies-img2.png";
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
export default class FeaturedCrousal extends Component {
  render() {
    return (
      <div>
        <div className="carousalOuter">
          <OwlCarousel className="slider-items owl-carousel" {...options}>
            <div className="item" style={{ marginRight: "25px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="featImg">
                    <img src={MrchendImg1} alt="" />
                    <div className="tshirtIcon">
                      <FaTshirt />
                    </div>
                  </div>
                  <div className="feattitle">
                    <small>NFT name here</small>
                    <span className="bold">Merchandise Title</span>
                  </div>
                  <div className="featpriceOut">
                    <div className="featprice">
                      <small>Price</small>
                      <span className="bold">$25.69</span>
                    </div>
                    <div className="featprice">
                      <small>Creator</small>
                      <span className="bold">John deo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "25px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="featImg">
                    <img src={MrchendImg2} alt="" />
                    <div className="tshirtIcon">
                      <FaTshirt />
                    </div>
                  </div>
                  <div className="feattitle">
                    <small>NFT name here</small>
                    <span className="bold">Merchandise Title</span>
                  </div>
                  <div className="featpriceOut">
                    <div className="featprice">
                      <small>Price</small>
                      <span className="bold">$25.69</span>
                    </div>
                    <div className="featprice">
                      <small>Creator</small>
                      <span className="bold">John deo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "25px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="featImg">
                    <img src={MrchendImg1} alt="" />
                    <div className="tshirtIcon">
                      <FaTshirt />
                    </div>
                  </div>
                  <div className="feattitle">
                    <small>NFT name here</small>
                    <span className="bold">Merchandise Title</span>
                  </div>
                  <div className="featpriceOut">
                    <div className="featprice">
                      <small>Price</small>
                      <span className="bold">$25.69</span>
                    </div>
                    <div className="featprice">
                      <small>Creator</small>
                      <span className="bold">John deo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "25px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="featImg">
                    <img src={MrchendImg2} alt="" />
                    <div className="tshirtIcon">
                      <FaTshirt />
                    </div>
                  </div>
                  <div className="feattitle">
                    <small>NFT name here</small>
                    <span className="bold">Merchandise Title</span>
                  </div>
                  <div className="featpriceOut">
                    <div className="featprice">
                      <small>Price</small>
                      <span className="bold">$25.69</span>
                    </div>
                    <div className="featprice">
                      <small>Creator</small>
                      <span className="bold">John deo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "25px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="featImg">
                    <img src={MrchendImg2} alt="" />
                    <div className="tshirtIcon">
                      <FaTshirt />
                    </div>
                  </div>
                  <div className="feattitle">
                    <small>NFT name here</small>
                    <span className="bold">Merchandise Title</span>
                  </div>
                  <div className="featpriceOut">
                    <div className="featprice">
                      <small>Price</small>
                      <span className="bold">$25.69</span>
                    </div>
                    <div className="featprice">
                      <small>Creator</small>
                      <span className="bold">John deo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    );
  }
}
