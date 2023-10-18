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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = React.useState([]);
  const [minAmount, setMinAmount] = React.useState(0);
  const [maxAmount, setMaxAmount] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const [refresh, setRefresh] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
    const [active, setActive] = useState(false);

    console.log(search, "search");
  
  
  
  

  const getAllCollections = () => {
    const dataFinal = {
      search: search ? search : "",
    };
    Axios.post(
      "/collection/all-users-collection-active?page=" + page + "&limit=" + limit,
      dataFinal,
      {
        headers: { authorization: localStorage.getItem("accessJWT") },
      }
    )
      .then((response) => {
        if (response.data.status == "success") {
            console.log(response.data.data, "collection data");
            setCollectionList(response.data.data);
       
        } else {
            setCollectionList([]);
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getAllCollections();
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
        {/* <div className="nftFlt_Left">
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
          </div> */}
        <div className="nftFlt_Right">
        <>
      <div className="collectionLest">
        <ul>
          {active === false ? (
            <>
              {collectionList?.length ? (
                collectionList.map((data) => {
                  
                  return (
                    <>
                    { data?.isActive &&
                    <Link
                      to={{
                        pathname: "/marketplace/collection-listing",
                        search: `?id=${data?._id}&for=all`,
                      }}
                    >
                      <li style={{ cursor: "pointer" }}>
                        <div className="collectionImg">
                          <img src={data?.imageUrl} alt="" />
                          <i>
                            <img src={data?.imageUrl} alt="" />
                          </i>
                        </div>
                        <div className="collectionHd bold">
                          {data?.collectionName} <HiCheckCircle />
                        </div>
                        <div className="ownersValueOuter">
                          <div className="ownvalueInn">
                            <span>Owners</span>
                            <strong>{data?.totalNftUser}</strong>
                          </div>
                          <div className="ownvalueInn">
                            <span>Total Volume</span>
                            <strong>{data?.totalNftPrice} KDA</strong>
                          </div>
                          <div className="ownvalueInn">
                            <span>Floor</span>
                            <strong>{data?.minNftPrice} KDA</strong>
                          </div>
                        </div>
                      </li>
                    </Link>
                    }
                    </>
                  );
                })
              ) : (
                <h1>No collections</h1>
                // <UpcomingProjects/>
              )}
            </>) : (
            <>
              
            </>
          )}
        </ul>
      </div>
      {/* <div className='loadmoreBtn'>
                    <button>Load More</button>
                </div> */}
    </>
       
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
