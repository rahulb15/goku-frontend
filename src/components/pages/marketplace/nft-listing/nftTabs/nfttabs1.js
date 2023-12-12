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
import { TabContent, TabPane, Nav, NavItem, NavLink, Card,  CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from "classnames";



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
  const [activeTab, setActiveTab] = React.useState("1");

  
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  
  

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

  const getAllDbCooper = () => {
    const dataFinal = {
      search: search ? search : "",
      minAmount: minAmount ? minAmount : 0,
      maxAmount: maxAmount ? maxAmount : 10000000,
      selected: selected,
    };
    Axios.post(
      "/passDetails/user-dbcooper-all?page=" + page + "&limit=" + limit,
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

    if(activeTab === '1'){
    getAllNfts();
    }
    else{
      getAllDbCooper();
    }
  }, [refresh, search, limit, selected,activeTab]);

  
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
        <Nav tabs>
        <NavItem style={{ cursor: 'pointer' }}>
          <NavLink className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}>
            Marketplace
          </NavLink>
        </NavItem>
        <NavItem style={{ cursor: 'pointer' }}>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}>
            Launchpad
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <div className="nftList listingList">
            <ul>
                {allNfts?.map((item, index) => {
                    return (
                        <li key={index}>
                            <div className="featItemBx">
                            <div className="glow">
                            <Link
                              to={{
                                pathname: "/marketplace/nft-overview",
                                search: `?id=${item?._id}&for=all`,
                              }}
                            >
                              <div className="featImg">
                                <img
                                  src={
                                    item?.fileImageUrl ? item?.fileImageUrl : item?.tokenImage ? item?.tokenImage : ""
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
                                search: `?id=${item?._id}&for=all`,
                              }}
                            >
                              <div className="feattitle">
                                <small>
                                {item.fileName  ? item.fileName : item?.collectionName}
                                  <HiCheckCircle />
                                </small>
                                <span className="bold">
                                  {/* {item?.collectionName
                                    ? item?.collectionName
                                    : "Not Revealed"}{" "}
                                  #{item?.imageIndex} */}
                                 {item.fileName  ? item.fileName : item?.collectionName} {item?.fileName ? "" : "#" + item?.imageIndex}

                                </span>
                              </div>
                              <div className="featpriceOut">
                                <div className="featprice">
                                  <small>From</small>
                                  <span className="bold">
                                    {item?.onAuction
                                      ? item?.onAuction
                                        ? "Open For Bids"
                                        : item?.nftPrice + " KDA"
                                      : item?.nftPrice + " KDA"}
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

              
            </ul> 
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
        </TabPane>
        <TabPane tabId="2">
        <div className="nftList listingList">
            <ul>
                {allNfts?.map((item, index) => {
                    return (
                        <li key={index}>
                            <div className="featItemBx">
                            <div className="glow">
                            <Link
                              to={{
                                pathname: "/marketplace/nft-overview",
                                search: `?id=${item?._id}`,
                              }}
                            >
                              <div className="featImg">
                                <img
                                  src={
                                    item?.fileImageUrl ? item?.fileImageUrl : item?.tokenImage ? item?.tokenImage : ""
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
                                search: `?id=${item?._id}&for=all`,
                              }}
                            >
                              <div className="feattitle">
                                <small>
                                  {/* {item?.collectionName} */}
                                  {item.fileName  ? item.fileName : item?.collectionName}
                                  <HiCheckCircle />
                                </small>
                                <span className="bold">
                                  {/* {item?.collectionName
                                    ? item?.collectionName
                                    : "Not Revealed"}{" "}
                                  #{item?.imageIndex} */}
                 {item.fileName  ? item.fileName : item?.collectionName} {item?.fileName ? "" : "#" + item?.imageIndex}

                                </span>
                              </div>
                              <div className="featpriceOut">
                                <div className="featprice">
                                  <small>From</small>
                                  <span className="bold">
                                    {item?.onAuction
                                      ? item?.onAuction
                                        ? "Open For Bids"
                                        : item?.nftPrice + " KDA"
                                      : item?.nftPrice + " KDA"}
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

              
            </ul> 
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
        </TabPane>
      </TabContent>


          
          
        </div>
      </div>
    </>
  );
}
