import Axios from "axios";
import { Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import { FaTshirt } from "react-icons/fa";
import React, { Component, useState, useEffect } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
// import axios from 'axios';

const NftTabs1 = () => {
  const [collectionList, setCollectionList] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [search, setSearch] = useState("");
  
  
  
  useEffect(() => {
    getCollection();
  }, [activeTab]);
  const getCollection = () => {
    console.log("getCollection",activeTab)
    if(activeTab == 1){

    Axios.get("/liked-nft/get-favorited-nft?type=nft", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        if (response.data.status == "success") {
          console.log(response.data.data, "responsessssss");
          setCollectionList(response.data.data);
        } else {
          setCollectionList([]);
        }
      })
      .catch((error) => {
        setCollectionList([]);
        //   setUserRegistered(false)
      });
    }
    else {
      Axios.get("/liked-nft/get-favorited-nft-pass?type=pass", {
        headers: { authorization: localStorage.getItem("accessJWT") },
      })
        .then((response) => {
          if (response.data.status == "success") {
            console.log(response.data.data, "responsessssss");
            setCollectionList(response.data.data);
          } else {
            setCollectionList([]);
          }
        })
        .catch((error) => {
          setCollectionList([]);
          //   setUserRegistered(false)
        });
    }
  };


  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const pageData = (data) => {
    return (
      <>
      <div className="profileOwnList">
        <div className="nftList">
          <ul>
            {data && data[0]
              ? data?.map((item,index) => {
                  return (
                    <li key={index}>
                    <div className="featItemBx">
                    <div className="glow">
                    <Link
                      to={{
                        pathname: "/marketplace/nft-overview",
                        search: item?.collectionName == "pass3" || item?.collectionName == "dbc" ? `?id=${item?._id}` :
                        `?id=${item?._id}&for=all`,
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

                  
                   
                      <div className="feattitle">
                        <small>
                        {data.fileName  ? data.fileName : data?.collectionName}
                          <HiCheckCircle />
                        </small>
                        <span className="bold">
                          {/* {item?.collectionName
                            ? item?.collectionName
                            : "Not Revealed"}{" "}
                          #{item?.imageIndex} */}
                    {data.fileName  ? data.fileName : data?.collectionName} {data?.fileName ? "" : "#" + data?.imageIndex}

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
                              : item?.collectionName == "pass3" || item?.collectionName == "dbc"
                              ?   item?.passCost   :item?.nftPrice + " KDA"
                               }
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
                })
              : null}
          </ul>
        </div>
      </div>
      </>
    );
  };







  return (
    <>
     <div className="listing_TabOuter">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
              style={{ cursor: "pointer" }}
            >
              Nft Favorites
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
              style={{ cursor: "pointer" }}
            >
              Launchpad Favorites
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="creatortabOuter">
              <div className="container">
                {pageData(collectionList)}
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="creatortabOuter">
              <div className="container">
                {pageData(collectionList)}
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default NftTabs1;
