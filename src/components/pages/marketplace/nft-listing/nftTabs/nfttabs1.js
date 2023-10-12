import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import MrchendImg1 from "../../../../../assets/nft-img1.png";
import MrchendImg2 from "../../../../../assets/nft-img2.png";
import MrchendImg3 from "../../../../../assets/nft-img3.png";
import MrchendImg4 from "../../../../../assets/nft-img4.png";
import { FaTshirt } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { BsGridFill, BsSearch } from "react-icons/bs";
import { RiGridFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
// import NFTSideBar from "./nftsidebar";
import NFTSideBar from "../../my-profile-owned/my-profile-tabs/nftsidebar";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";



export default function NftTabs1() {
  const [allNfts, setAllNfts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = React.useState([]);
  const [minAmount, setMinAmount] = React.useState(0);
  const [maxAmount, setMaxAmount] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const [refresh, setRefresh] = useState(false);

  
  
  
  

  const getAllNfts = () => {
    const dataFinal = {
      search: search ? search : "",
      minAmount: minAmount ? minAmount : 0,
      maxAmount: maxAmount ? maxAmount : 10000000,
      selected: selected,
    };
    Axios.post(
      "/nft/user-nft-all?page=" + page + "&limit=" + limit,
      dataFinal,
      {
        headers: { authorization: localStorage.getItem("accessJWT") },
      }
    )
      .then((response) => {
        if (response.data.status == "success") {
          let nftList = response.data.data.paginatedResults;
          setTotal(response.data.data.totalCount);
          setAllNfts(nftList);
        } else {
          setAllNfts([]);
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getAllNfts();
  }, [refresh, search, limit, selected]);

  
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
            <div className="fltrRgtInn_Left">
              <div className="iftSrch">
                <FormGroup>
                  <Input
                    type="text"
                    name="search"
                    id="exampleSearch"
                    placeholder="Search for items"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </FormGroup>
                <button onClick={() => setRefresh(!refresh)}>
                  <BsSearch />
                </button>
              </div>
            </div>
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
        <NFTSideBar
            setSelected={setSelected}
            selected={selected}
            setMinAmount={setMinAmount}
            setMaxAmount={setMaxAmount}
            setOptions={setOptions}
            options={options}
            setRefresh={setRefresh}
            refresh={refresh}
          />{" "}        
          </div>
        <div className="nftFlt_Right">
          <div className="nftList listingList">
            <ul>
                {allNfts.map((item, index) => {
                    return (
                        <li key={index}>
                            <div className="featItemBx">
                            <div className="glow">
                            <Link
                              to={{
                                pathname: "/marketplace/nft-overview",
                                search: `?id=${item._id}&for=all`,
                              }}
                            >
                              <div className="featImg">
                                <img
                                  src={
                                    item.tokenImage
                                  }
                                  // style={data._id == userId && hover ? { opacity: 0.5 } : { opacity: 1 }}
                                />
                                <div className="tshirtIcon">
                                  <FaTshirt />
                                </div>
                              </div>
                            </Link>

                          
                            <Link
                              to={{
                                pathname: "/marketplace/nft-overview",
                                search: `?id=${item._id}&for=all`,
                              }}
                            >
                              <div className="feattitle">
                                <small>
                                  {item.collectionName}
                                  <HiCheckCircle />
                                </small>
                                <span className="bold">
                                  {item.collectionName
                                    ? item.collectionName
                                    : "Not Revealed"}{" "}
                                  #{item.imageIndex}
                                </span>
                              </div>
                              <div className="featpriceOut">
                                <div className="featprice">
                                  <small>From</small>
                                  <span className="bold">
                                    {item.onAuction
                                      ? item.onAuction
                                        ? "Open For Bids"
                                        : item.nftPrice + " KDA"
                                      : item.nftPrice + " KDA"}
                                  </span>{" "}
                                </div>
                                <div className="featprice">
                                  <small>Highest Bid</small>
                                  <span className="bold">
                                    {item?.bidInfo?.bidPrice
                                      ? item?.bidInfo?.bidPrice
                                      : "Not Bids"}
                                  </span>{" "}
                                </div>
                              </div>
                            </Link>
                            </div>
                            </div>
                        
                        </li>
                    );
                    }
                )}






              {/* <li>
                <a href="/marketplace/nft-overview">
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
                </a>
              </li>
              <li>
                <a href="/marketplace/nft-overview">
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
                </a>
              </li>
              <li>
                <a href="/marketplace/nft-overview">
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
                </a>
              </li>
              <li>
                <a href="/marketplace/nft-overview">
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
                </a>
              </li>
              <li>
                <a href="/marketplace/nft-overview">
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
                </a>
              </li>
              <li>
                <a href="/marketplace/nft-overview">
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
                </a>
              </li>
              <li>
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
              </li>
              <li>
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
              </li>
              <li>
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
              </li>
              <li>
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
              </li>
              <li>
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
              </li>
              <li>
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
              </li>*/}
            </ul> 
          </div>
          {limit > total ? null : (
            <>
              {limit >= 10 ? (
                <div className="loadmoreBtn">
                  <button
                    onClick={() => setLimit(limit + 10)}
                    style={{ width: "100%" }}
                  >
                    Load More
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </>
  );
}
