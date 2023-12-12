//import { Button } from 'reactstrap';
import mrkpaboutImg1 from "../../../../assets/mrkplc-about-img1.png";
import mrkpaboutImg2 from "../../../../assets/mrkplc-about-img2.png";
import mrkpaboutImg3 from "../../../../assets/mrkplc-about-img3.png";
import mrkpaboutImg4 from "../../../../assets/mrkplc-about-img4.png";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
//Owl Carousel Libraries and Module
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
//Owl Carousel Settings
const options = {
  responsiveClass: true,
  nav: true,
  margin: 20,
  autoplay: false,
  navText: ["Prev", "Next"],
  smartSpeed: 1000,
  loop: true,
  responsive: {
    0: {
      items: 2,
    },
    400: {
      items: 2,
    },
    600: {
      items: 3,
    },
    700: {
      items: 4,
    },
    1000: {
      items: 6,
    },
  },
};
export default function NftProjectSlider() {
  const [screenLoading, setScreenLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filteredDbCooper, setFilteredDbCooper] = useState([]);

  const getDbCooper = () => {
    setScreenLoading(true);
    Axios.get(
      "/passDetails/all-nft-on-marketplace-dbcooper?page=" +
        page +
        "&limit=" +
        limit +
        "&search=" +
        searchInput,
      {
        headers: { authorization: localStorage.getItem("accessJWT") },
      }
    )
      .then((response) => {
        if (response.data.status == "success") {
          let dbCopperList = response.data?.data ? response.data?.data : [];
          setTotalPage(response.data?.count ? response.data?.count : 0);
          const list = dbCopperList;

          setFilteredDbCooper(list);
          setScreenLoading(false);
        }
      })
      .catch((error) => {
        setScreenLoading(false);
      });
  };

  useEffect(() => {
    getDbCooper();
  }, [searchInput, page, limit]);
  console.log(filteredDbCooper, "filteredDbCooper");

  return (
    <div className="nftslideOuter">
      <div className="nftfeatHd bold">DBCooper</div>
      <div className="carousalOuter">
        <OwlCarousel className="slider-items owl-carousel" {...options}>
          {filteredDbCooper?.map((item, index) => {
            return (
              <div className="item" key={index}>
                 <Link
                    to={{
                      pathname: "/marketplace/nft-overview",
                      search: `?id=${item?._id}`,
                    }}
                  >
              <div className="featItemBx">
              <div className="glow">
                <div className="">
                 
                    {" "}
                    <img src={item?.fileImageUrl ? item?.fileImageUrl : item?.tokenImage ? item?.tokenImage : ""} alt="" />
                </div>
              </div>
              
              </div>
              </Link>

              
              </div>
            );
          })}
        </OwlCarousel>
      </div>
    </div>
  );
}
