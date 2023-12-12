import React, { Component, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
//import ownedImg1 from "../../../../../assets/profile-owned-img1.png";
//import ownedImg2 from "../../../../../assets/profile-owned-img2.png";
//import ownedImg3 from "../../../../../assets/profile-owned-img3.png";
import { FaTshirt } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { BsGridFill, BsSearch } from "react-icons/bs";
import { RiGridFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import { SpinnerCircular } from "spinners-react";
import NFTSideBar from "./nftsidebar";
import Axios from "axios";
import { Link } from "react-router-dom";

const NftTabs1 = () => {
  const [nftList, setNftList] = useState([]);
  const [screenLoading, setScreenLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getUserNft();
  }, [refresh]);

  const getUserNft = () => {
    setScreenLoading(true);
    Axios.get("/nft/user-nft", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        
        if (response.data.status == "success") {
          let nfts = response.data.data;
          const list = nfts.filter((item) => {
            if (item.onMarketplace == false) {
              return item;
            }
          });
          setNftList(list);
          setScreenLoading(false);

          // setCollectionList(filteredCollectionList)
        } else {
          setNftList([]);
          
          setScreenLoading(false);
        }
      })
      .catch((error) => {
        setNftList([]);
        
        setScreenLoading(false);
      });
  };
  return (
    <>
      <div className="filterBx">
        <div className="FltrLeft">
          <div className="fltrBtnBx">
            <Button className="filterBtn">
              <MdArrowBackIos /> Filter
            </Button>
          </div>
        </div>
        <div className="FltrRight">
          <div className="fltrRgtInn">
            <div className="fltrRgtInn_Left">&nbsp;</div>
            <div className="fltrRgtInn_Right">
              <div className="trendingBtn">
                <FormGroup>
                  <Input
                    type="select"
                    name="select"
                    placeholder="Trending"
                    id="exampleSelect"
                  >
                    <option>Recently listed</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="gridBtnBx">
                <Button className="gridBtn">
                  <BsGridFill />
                </Button>
                <Button className="gridListBtn">
                  <RiGridFill />
                </Button>
              </div>
              <div className="refreshBtnBx">
                <Button onClick={() => setRefresh(!refresh)}>
                  <TbRefresh />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nftProdListOuter">
        <div className="nftFlt_Left">
          <NFTSideBar />
        </div>
        <div className="nftFlt_Right">
          <div className="nftList">
            <ul>
              {nftList.length ? (
                nftList.map((data) => {
                  
                  return (
                    <Link
                      to={{
                        pathname: "/marketplace/nft-overview",
                        search: `?id=${data._id}`,
                      }}
                    >
                      {" "}
                      <li key={data._id}>
                        <div className="featItemBx">
                          <div className="glow">

                            <div className="featImg">
                              <img src={data?.fileImageUrl ? data?.fileImageUrl : data?.tokenImage ? data?.tokenImage : ""} alt="" />
                              <div className="tshirtIcon">
                                <FaTshirt />
                              </div>
                            </div>
                            <div className="feattitle">
                              <small>
                              {data.fileName  ? data.fileName : data?.collectionName} <HiCheckCircle />
                              </small>
                              <span className="bold">
                              {data.fileName  ? data.fileName : data?.collectionName} #584
                              </span>
                            </div>
                            <div className="featpriceOut">
                              <div className="featprice">
                                <small>From</small>
                                <span className="bold">{data.nftPrice} KDA</span>
                              </div>
                              <div className="featprice">
                                <small>Highest Bid</small>
                                <span className="bold">6.5 KDA</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  );
                })
              ) : (
                <h1>No NFTS</h1>
              )}
            </ul>
          </div>
          <div className="loadmoreBtn">
            <button>Load More</button>
          </div>
          <div className="spinner" style={{ display: screenLoading ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 999 }}>
            {screenLoading ? (
              <>
                <SpinnerCircular
                  size={80}
                  color="black"
                  secondaryColor="red"
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default NftTabs1;
