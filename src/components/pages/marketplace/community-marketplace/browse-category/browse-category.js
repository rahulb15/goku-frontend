import React from "react";
import ArtDark from "../../../../../assets/Art_Dark.png";
import ArtDay from "../../../../../assets/Art_Day.png";
import CollectiblesDark from "../../../../../assets/Collectibles_Dark.png";
import CollectiblesDay from "../../../../../assets/Collectibles_Day.png";
import LaunchpadDark from "../../../../../assets/LaunchPad_Dark.png";
import LaunchpadDay from "../../../../../assets/LaunchPad_Day.png";
import MusicDark from "../../../../../assets/Music_Dark.png";
import MusicDay from "../../../../../assets/Music_Day.png";
import PhotographyDark from "../../../../../assets/Photography_Dark.png";
import PhotographyDay from "../../../../../assets/Photography_Day.png";
import SportsDark from "../../../../../assets/Sports_Dark.png";
import SportsDay from "../../../../../assets/Sports_Day.png";
import TradingCardDark from "../../../../../assets/TradingCard_Dark.png";
import TradingCardDay from "../../../../../assets/TradingCard_Day.png";
//import GamingDay from "../../../../../assets/Gaming_Day.png";
//import GamingDark from "../../../../../assets/Gaming_Dark.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
//import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useSelector } from "react-redux";

// //Owl Carousel Settings
// const options = {
//   responsiveClass: true,
//   nav: true,
//   autoplay: true,
//   navText: ["Prev", "Next"],
//   smartSpeed: 1000,
//   loop: true,
//   responsive: {
//     0: {
//       items: 1,
//     },
//     400: {
//       items: 2,
//     },
//     600: {
//       items: 2,
//     },
//     700: {
//       items: 3,
//     },
//     1000: {
//       items: 4,
//     },
//   },
// };

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  margin: 10,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const BrowseCategory = () => {
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  return (
    <div>
      <div className="marketplaceAbout">
        <div className="container">
          <div
            className={
              nightModeStatus ? "market_mainHd" : "market_mainHd_Night"
            }
          >
            <h2 className="extrabold">
              {" "}
              <span className="extrabold">Browse By Category</span>
            </h2>
          </div>
          <div className="carousalOuter">
            <Slider className="slider-items owl-carousel" {...settings}>
              {/* <OwlCarousel className="slider-items owl-carousel" {...options}> */}
              <div className="item" style={{ marginRight: "10px" }}>
                <div className="featItemBx">
                  <div className="glow">
                    <div className="featImg">
                      <Link to="/marketplace/explore-collections?tab=Art">
                        {" "}
                        <i>
                          <img
                            src={nightModeStatus ? ArtDark : ArtDay}
                            alt=""
                          />
                        </i>
                        <strong>Art</strong>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" style={{ marginRight: "10px" }}>
                <div className="featItemBx">
                  <div className="glow">
                    <div className="featImg">
                      <Link to="/marketplace/explore-collections?tab=Collectibles">
                        <i>
                          <img
                            src={
                              nightModeStatus
                                ? CollectiblesDark
                                : CollectiblesDay
                            }
                            alt=""
                          />
                        </i>
                        <strong>Collectibles</strong>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" style={{ marginRight: "10px" }}>
                <div className="featItemBx">
                  <div className="glow">
                    <div className="featImg">
                      <Link to="/marketplace/explore-collections?tab=Music">
                        {" "}
                        <i>
                          {" "}
                          <img
                            src={nightModeStatus ? MusicDark : MusicDay}
                            alt=""
                          />
                        </i>
                        <strong>Music</strong>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" style={{ marginRight: "10px" }}>
                <div className="featItemBx">
                  <div className="glow">
                    <div className="featImg">
                      <Link to="/marketplace/explore-collections?tab=Photography">
                        <i>
                          <img
                            src={
                              nightModeStatus ? PhotographyDark : PhotographyDay
                            }
                            alt=""
                          />
                        </i>
                        <strong>Photography</strong>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" style={{ marginRight: "10px" }}>
                <div className="featItemBx">
                  <div className="glow">
                    <div className="featImg">
                      <Link to="/marketplace/explore-collections?tab=Sports">
                        {" "}
                        <i>
                          {" "}
                          <img
                            src={nightModeStatus ? SportsDark : SportsDay}
                            alt=""
                          />
                        </i>
                        <strong>Sports</strong>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" style={{ marginRight: "10px" }}>
                <div className="featItemBx">
                  <div className="glow">
                    <div className="featImg">
                      <Link to="/marketplace/explore-collections?tab=Trading-cards">
                        <i>
                          <img
                            src={
                              nightModeStatus ? TradingCardDark : TradingCardDay
                            }
                            alt=""
                          />
                        </i>
                        <strong>Trading Cards</strong>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" style={{ marginRight: "10px" }}>
                <div className="featItemBx">
                  <div className="glow">
                    <div className="featImg">
                      <Link to="/marketplace/explore-collections?tab=Launchpad">
                        <i>
                          <img
                            src={nightModeStatus ? LaunchpadDark : LaunchpadDay}
                            alt=""
                          />
                        </i>
                        <strong>Launchpad</strong>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* </OwlCarousel> */}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const BrowseCategory = () => {
//   const options = {
//     responsiveClass: true,
//     nav: true,
//     margin: 20,
//     autoplay: true,
//     navText: ["Prev", "Next"],
//     smartSpeed: 1000,
//     loop: true,
//     responsive: {
//       0: {
//         items: 2,
//       },
//       400: {
//         items: 2,
//       },
//       600: {
//         items: 3,
//       },
//       700: {
//         items: 4,
//       },
//       // 1000: {
//       //     items: 6,
//       // }
//     },
//   };

//   return (
//     <div>
//       <div className="marketplaceAbout">
//         <div className="container">
//           <div className="market_mainHd">
//             <h2 className="extrabold">Browse By Category</h2>
//           </div>
//           <div className="carousalOuter">
//             <OwlCarousel className="slider-items owl-carousel" {...options}>
//               <div className="item">
//                 <Link to="/marketplace/explore-collections?tab=Art">
//                   {" "}
//                   <i>
//                     <img src={browseImg1} alt="" />
//                   </i>
//                   <strong>Art</strong>
//                 </Link>
//               </div>
//               <div className="item">
//               <Link to='/marketplace/explore-collections?tab=Collectibles'><i><img src={browseImg4} alt="" /></i>
//                                     <strong>Collectibles</strong>
//                 </Link>
//               </div>
//               <div className="item">
//                                        <Link to='/marketplace/explore-collections?tab=Music'> <i> <img src={browseImg2} alt="" /></i>
//                                    <strong>Music</strong>
//                 </Link>
//               </div>
//               <div className="item">
//               <Link to='/marketplace/explore-collections?tab=Photography'><i><img src={browseImg4} alt="" /></i>
//                                     <strong>Photography</strong></Link>

//               </div>
//               <div className="item">
//               <Link to='/marketplace/explore-collections?tab=Sports'>  <i> <img src={browseImg3} alt="" /></i>
//                                     <strong>Sports</strong></Link>
//               </div>
//               <div className="item">
//               <Link to='/marketplace/explore-collections?tab=Trading-cards'><i><img src={browseImg4} alt="" /></i>
//                                     <strong>Trading Cards</strong></Link>
//               </div>
//               <div className="item">
//               <Link to='/marketplace/explore-collections?tab=Launchpad'><i><img src={browseImg4} alt="" /></i>
//                                     <strong>Launchpad</strong></Link>
//               </div>
//             </OwlCarousel>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// <div className='browseCatList'>
//                             <ul>
//                             <div className='item'>
//                                <li>
//                                <Link to="/marketplace/explore-collections?tab=Art">  <i><img src={browseImg1} alt="" /></i>
//                                     <strong>Art</strong></Link>
//                                 </li>
//                                 </div>

//                                 <li>
//                                 <Link to='/marketplace/explore-collections?tab=Collectibles'><i><img src={browseImg4} alt="" /></i>
//                                     <strong>Collectibles</strong></Link>
//                                 </li>
//                                <li>
//                                <Link to='/marketplace/explore-collections?tab=Music'> <i> <img src={browseImg2} alt="" /></i>
//                                     <strong>Music</strong></Link>
//                                 </li>
//                                 <li>
//                               <Link to='/marketplace/explore-collections?tab=Photography'><i><img src={browseImg4} alt="" /></i>
//                                     <strong>Photography</strong></Link>
//                                 </li>
//                                <li>
//                                <Link to='/marketplace/explore-collections?tab=Sports'>  <i> <img src={browseImg3} alt="" /></i>
//                                     <strong>Sports</strong></Link>
//                                 </li>

//                                 <li>
//                                 <Link to='/marketplace/explore-collections?tab=Trading-cards'><i><img src={browseImg4} alt="" /></i>
//                                     <strong>Trading Cards</strong></Link>
//                                 </li>
//                                 <li>
//                                 <Link to='/marketplace/explore-collections?tab=Launchpad'><i><img src={browseImg4} alt="" /></i>
//                                     <strong>Launchpad</strong></Link>
//                                 </li>
//                             </ul>
//                         </div>
