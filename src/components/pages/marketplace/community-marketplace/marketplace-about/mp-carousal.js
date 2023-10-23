//import { Button } from "reactstrap";
import { FaTshirt } from "react-icons/fa";
import mrkpaboutImg1 from "../../../../../assets/mrkplc-about-img1.png";
import mrkpaboutImg2 from "../../../../../assets/mrkplc-about-img2.png";
import mrkpaboutImg3 from "../../../../../assets/mrkplc-about-img3.png";
import React, { useEffect, useState } from "react";
import mrkpaboutImg4 from "../../../../../assets/mrkplc-about-img4.png";
//Owl Carousel Libraries and Module
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import Axios from "axios";
import { Link } from "react-router-dom";

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
export default function MpCrousal() {
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
  }, []);

  console.log("filteredDbCooper", filteredDbCooper, page, limit, searchInput);

  return (
    <div>
      <div className="carousalOuter">
        <OwlCarousel className="slider-items owl-carousel" {...options}>
          {filteredDbCooper?.map((item, index) => {
            console.log("itemfilter", item);
            return (
              <div className="item" style={{ marginRight: "25px" }} key={index}>
                <div className="featItemBx">
                  <div className="glow">
                    <Link
                      to={{
                        pathname: "/marketplace/nft-overview",
                        search: `?id=${item._id}`,
                      }}
                    >
                      <div className="featImg">
                        <img src={item?.tokenImage} alt="" />
                        <div
                          className="tshirtIcon"
                          style={{ marginRight: "25px" }}
                        >
                          <FaTshirt />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </OwlCarousel>
      </div>
      <div className="seeall">
        <Link to="/marketplace/nft-projects">See All Projects</Link>
      </div>
    </div>
  );
}
