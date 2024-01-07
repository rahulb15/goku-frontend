//import { Button } from 'reactstrap';
import mrkpaboutImg1 from "../../../../assets/nft-img1.png";
import mrkpaboutImg2 from "../../../../assets/nft-img2.png";
import mrkpaboutImg3 from "../../../../assets/nft-img3.png";
import mrkpaboutImg4 from "../../../../assets/nft-img4.png";
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
  const [hotCollections, setHotCollections] = useState([]);

  const getAllCollections = () => {
    Axios.get("/nft/all-users-nft-hot-collections-1", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        if (response.data.status == "success") {
          setHotCollections(response.data.data);
        } else {
          setHotCollections([]);
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getAllCollections();
  }, []);


  return (
    <div className="nftslideOuter">
      {hotCollections.length > 0 &&
        hotCollections?.map((item, index) => {
          return (
            <>
              <div className="nftfeatHd bold" key={index}>
                {item?.name}
              </div>
              <div className="carousalOuter">
                <OwlCarousel className="slider-items owl-carousel" {...options}>
                  {item?.nft?.map((item, index) => {
                    return (
                      <div className="item" key={index}>
                        <Link
                          to={{
                            pathname: "/marketplace/nft-overview",
                            search: `?id=${item._id}&for=all`,
                          }}
                        >
                          <div className="featItemBx">
                            <div className="glow">
                              <div className="">
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
            </>
          );
        })}

      {/* <div className='nftfeatHd bold'>KDA Punks</div>
                <div className='carousalOuter'>
                    <OwlCarousel className="slider-items owl-carousel" {...options}>
                        <div className='item'>
                            <div className=''><img src={mrkpaboutImg1} alt="" /></div>
                        </div>
                        <div className='item'>
                            <div className=''><img src={mrkpaboutImg2} alt="" /></div>
                        </div>
                        <div className='item'>
                            <div className=''><img src={mrkpaboutImg3} alt="" /></div>
                        </div>
                        <div className='item'>
                            <div className=''><img src={mrkpaboutImg4} alt="" /></div>
                        </div>
                        <div className='item'>
                            <div className=''><img src={mrkpaboutImg1} alt="" /></div>
                        </div>
                        <div className='item'>
                            <div className=''><img src={mrkpaboutImg3} alt="" /></div>
                        </div>
                        <div className='item'>
                            <div className=''><img src={mrkpaboutImg4} alt="" /></div>
                        </div>
                        <div className='item'>
                            <div className=''><img src={mrkpaboutImg1} alt="" /></div>
                        </div>

                    </OwlCarousel>
                </div> */}
    </div>
  );
}
