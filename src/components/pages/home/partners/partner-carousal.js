import React, { Component } from "react";

//import ClientLogo1 from '../../../../assets/client-logo1.png'
import ClientLogo2 from "../../../../assets/client-logo2.png";
import ClientLogo3 from "../../../../assets/client-logo3.png";
import ClientLogo4 from "../../../../assets/client-logo4.png";
import ClientLogo5 from "../../../../assets/client-logo5.png";
import ClientLogo6 from "../../../../assets/client-logo6.png";
//import ClientLogo7 from '../../../../assets/client-logo7.png'
import ClientLogo8 from "../../../../assets/client-logo8.png";
import ClientLogo9 from "../../../../assets/client-logo9.png";
//import ClientDark1 from '../../../../assets/partner-dark-img1.png'
import ClientDark2 from "../../../../assets/partner-dark-img2.png";
import ClientDark3 from "../../../../assets/partner-dark-img3.png";
import ClientDark4 from "../../../../assets/partner-dark-img4.png";
//import ClientDark5 from '../../../../assets/partner-dark-img5.png'

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
        <div className="carousalOuter">
          <OwlCarousel className="slider-items owl-carousel" {...options}>
            {/* <div className='item'><img className='lightLogo' src={ClientLogo1} alt="" /><img className='darkLogo' src={ClientDark1} alt="" /></div> */}
            <div className="item">
              <img className="lightLogo" src={ClientLogo2} alt="" />
              <img className="darkLogo" src={ClientDark2} alt="" />
            </div>
            <div className="item">
              <img className="lightLogo" src={ClientLogo5} alt="" />
              <img className="darkLogo" src={ClientDark3} alt="" />
            </div>
            <div className="item">
              <img className="lightLogo" src={ClientLogo6} alt="" />
              <img className="darkLogo" src={ClientDark4} alt="" />
            </div>
            {/* <div className='item'><img className='lightLogo' src={ClientLogo7} alt="" /><img className='darkLogo' src={ClientDark5} alt="" /></div> */}
            <div className="item">
              <img src={ClientLogo3} alt="" />
            </div>
            <div className="item">
              <img src={ClientLogo4} alt="" />
            </div>
            <div className="item">
              <img src={ClientLogo8} alt="" />
            </div>
            <div className="item">
              <img src={ClientLogo9} alt="" />
            </div>
          </OwlCarousel>
        </div>
      </div>
    );
  }
}
