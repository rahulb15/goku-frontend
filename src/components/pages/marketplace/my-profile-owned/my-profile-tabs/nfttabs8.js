import React, { Component, useState, useEffect } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  //Card,
  //Form,
  FormGroup,
  //Label,
  Input,
  //FormText,
  Button,
  //CardTitle,
  //CardText,
  //Row,
  //Col,
} from "reactstrap";
import classnames from "classnames";
//import marchendImg1 from "../../../../../assets/marchendies-img2.png";
import NftListingTab from "../../creator-owned/nft-listing-tab";
import { useNavigate } from "react-router-dom";
import HotCollectionsTab from "./onSale";
import { MdArrowBackIos } from "react-icons/md";
import { BsGridFill, BsSearch } from "react-icons/bs";
import { RiGridFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";

export default function NftTabs1() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTab();
  }, []);

  const getTab = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let foo = params.get("tab");
    
    if (foo === null) {
      setActiveTab("1");
      navigate("/marketplace/my-profile-owned?tab=Owned");
    }
    if (foo === "Owned") {
      setActiveTab("1");
    }
    if (foo === "On-sale") {
      setActiveTab("2");
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (tab === "1") {
        navigate("/marketplace/my-profile-owned?tab=Launchpad?tab=Owned");
      }
      if (tab === "2") {
        navigate("/marketplace/my-profile-owned?tab=Launchpad?tab=On-sale");
      }
    }
  };

  return (
    <>
      {/* <i><img src={marchendImg1} alt='' /></i>
                            <span>Merchandise Title</span>
                            <small>$25.69</small> */}
      {/* <NftListingTab {...this.props}/> */}
      {/* <div className='creatortabOuter'>
                        <div className='container'>
                            <NftListingTab />
                        </div>
                    </div> */}
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
                    type="name"
                    name="name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="exampleEmail"
                    placeholder="Search by NFTs"
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
              Launchpad Owned
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
              Launchpad On Sale
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '4' })}
              onClick={() => { toggle('4'); }} style={{cursor:"pointer"}}>
              Created
            </NavLink>
          </NavItem> */}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="creatortabOuter">
              <div className="container">
                <NftListingTab refresh={refresh} setRefresh={setRefresh} search={search} />
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="creatortabOuter">
              <div className="container">
                <HotCollectionsTab refresh={refresh} setRefresh={setRefresh} search={search} />
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
}
