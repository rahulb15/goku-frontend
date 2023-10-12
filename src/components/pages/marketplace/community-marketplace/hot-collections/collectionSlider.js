import React from "react";
import CollImg1 from "../../../../../assets/collection-img1.png";
import CollImg2 from "../../../../../assets/collection-img2.png";
import CollImg3 from "../../../../../assets/collection-img3.png";
import CollImg4 from "../../../../../assets/collection-img4.png";
import CollImg5 from "../../../../../assets/collection-img5.png";
import CollImg6 from "../../../../../assets/collection-img6.png";
import { Link } from "react-router-dom";
//Owl Carousel Libraries and Module
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

//Owl Carousel Settings
const options = {
  responsiveClass: true,
  nav: false,
  margin: 10,
  autoplay: false,
  navText: ["Prev", "Next"],
  smartSpeed: 1000,
  loop: false,
  responsive: {
    0: {
      items: 3,
    },
    400: {
      items: 4,
    },
    600: {
      items: 3,
    },
    700: {
      items: 3,
    },
    1000: {
      items: 6,
    },
  },
};
export default function CollectionSlider(props) {
  const { item } = props;
  
  // const [nfts, setNfts] = useState([]);

  // const getAllNFTs = () => {
  //   const body = {
  //     collectionId: item?.collectionId._id,
  //   };
  //   Axios.post("/nft/all-users-nft-hot-collections-by-collectionId", body, {
  //     headers: { authorization: localStorage.getItem("accessJWT") },
  //   })
  //     .then((response) => {
  //       
  //       if (response.data.status == "success") {
  //         setNfts(response.data.data.results);
  //       } else {
  //         setNfts([]);
  //       }
  //     })
  //     .catch((error) => {});
  // };

  // useEffect(() => {
  //   getAllNFTs();
  // }, []);
  // 

  return (
    <div>
      <div className="carousalOuter">
        <OwlCarousel
          className="slider-items owl-carousel"
          {...options}
          style={{ marginLeft: "-10px" }}
        >
          {item?.length > 0 &&
            item?.map((item, index) => {
              return (
                <div
                  className="item"
                  style={{ marginRight: "10px" }}
                  key={index}
                >
                    <Link
                      to={{
                        pathname: "/marketplace/nft-overview",
                        search: `?id=${item._id}&for=all`,
                      }}
                    >
                  <div className="featItemBx">
                    <div className="glow">
                      <div className="collImg">
                        <img src={CollImg1} alt="" />
                        <span>{item?.nftPrice} KDA</span>
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              );
            })}
        </OwlCarousel>
      </div>

      {item?.length == 0 && item?.length != undefined && (
        <div className="carousalOuter">
          <OwlCarousel
            className="slider-items owl-carousel"
            {...options}
            style={{ marginLeft: "-10px" }}
          >
            <div className="item" style={{ marginRight: "10px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="collImg">
                    <img src={CollImg1} alt="" />
                    <span>2.5 KDA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "10px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="collImg">
                    <img src={CollImg2} alt="" />
                    <span>2.5 KDA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "10px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="collImg">
                    <img src={CollImg3} alt="" />
                    <span>2.5 KDA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "10px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="collImg">
                    <img src={CollImg4} alt="" />
                    <span>2.5 KDA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "10px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="collImg">
                    <img src={CollImg5} alt="" />
                    <span>2.5 KDA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="item" style={{ marginRight: "10px" }}>
              <div className="featItemBx">
                <div className="glow">
                  <div className="collImg">
                    <img src={CollImg6} alt="" />
                    <span>2.5 KDA</span>
                  </div>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      )}
    </div>
  );
}
