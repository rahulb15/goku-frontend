import React from "react";
//import { Button } from 'reactstrap';
import { FaTshirt } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import MrchendImg1 from "../../../../../assets/nft-img1.png";
import MrchendImg2 from "../../../../../assets/nft-img2.png";
import MrchendImg3 from "../../../../../assets/nft-img3.png";
import MrchendImg4 from "../../../../../assets/nft-img4.png";
//import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//Owl Carousel Libraries and Module
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
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
const SellingCrousal = (props) => {
  const { items } = props;

  return (
    <div>
      <div className="carousalOuter">
        <OwlCarousel className="slider-items owl-carousel" {...options}>
          {items &&
            items?.length > 0 &&
            items?.map((nft, index) => {
              console.log(nft, "nftTrending");
              return (
                <div
                  className="item"
                  style={{ marginRight: "10px" }}
                  key={index}
                >
                  <Link
                      to={{
                        pathname: "/marketplace/nft-overview",
                        search: `?id=${nft._id}&for=all`,
                      }}>
                  <div className="featItemBx">
                    <div className="glow">
                      <div className="featImg">
                      
                        {/* <img src={nft?.tokenImage} alt="" /> */}
                        <img src={nft?.fileImageUrl ? nft?.fileImageUrl : nft?.tokenImage ? nft?.tokenImage : ""} alt="" />
                        <div className="tshirtIcon">
                          <FaTshirt />
                        </div>
                        
                      </div>
                      <div className="feattitle">
                        <small>
                          {nft?.collectionName} <HiCheckCircle />
                        </small>
                      </div>
                      <div className="featpriceOut">
                        <div className="featprice">
                          <small>Price</small>
                          <span className="bold">{nft?.nftPrice}</span>
                        </div>
                        <div className="featprice">
                          <small>Creator</small>
                          <span className="bold">
                            {/* {nft?.collectionName} */}
                            {nft.fileName  ? nft.fileName : nft?.collectionName}
                            </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              );
            })}

          {/* <div className="item" style={{ marginRight: "10px" }}>
            <div className="featItemBx">
              <div className="glow">
                <div className="featImg">
                  <img src={MrchendImg1} alt="" />
                  <div className="tshirtIcon">
                    <FaTshirt />
                  </div>
                </div>
                <div className="feattitle">
                  <small>
                    NFT name here <HiCheckCircle />
                  </small>
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
          <div className="item" style={{ marginRight: "10px" }}>
            <div className="featItemBx">
              <div className="glow">
                <div className="featImg">
                  <img src={MrchendImg2} alt="" />
                  <div className="tshirtIcon">
                    <FaTshirt />
                  </div>
                </div>
                <div className="feattitle">
                  <small>
                    NFT name here <HiCheckCircle />
                  </small>
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
          <div className="item" style={{ marginRight: "10px" }}>
            <div className="featItemBx">
              <div className="glow">
                <div className="featImg">
                  <img src={MrchendImg3} alt="" />
                  <div className="tshirtIcon">
                    <FaTshirt />
                  </div>
                </div>
                <div className="feattitle">
                  <small>
                    NFT name here <HiCheckCircle />
                  </small>
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
          <div className="item" style={{ marginRight: "10px" }}>
            <div className="featItemBx">
              <div className="glow">
                <div className="featImg">
                  <img src={MrchendImg4} alt="" />
                  <div className="tshirtIcon">
                    <FaTshirt />
                  </div>
                </div>
                <div className="feattitle">
                  <small>
                    NFT name here <HiCheckCircle />
                  </small>
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
          <div className="item" style={{ marginRight: "10px" }}>
            <div className="featItemBx">
              <div className="glow">
                <div className="featImg">
                  <img src={MrchendImg4} alt="" />
                  <div className="tshirtIcon">
                    <FaTshirt />
                  </div>
                </div>
                <div className="feattitle">
                  <small>
                    NFT name here <HiCheckCircle />
                  </small>
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
          <div className="item" style={{ marginRight: "10px" }}>
            <div className="featItemBx">
              <div className="glow">
                <div className="featImg">
                  <img src={MrchendImg4} alt="" />
                  <div className="tshirtIcon">
                    <FaTshirt />
                  </div>
                </div>
                <div className="feattitle">
                  <small>
                    NFT name here <HiCheckCircle />
                  </small>
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
          </div> */}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default SellingCrousal;
