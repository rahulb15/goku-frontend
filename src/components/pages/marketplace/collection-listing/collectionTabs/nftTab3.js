import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BsGridFill, BsSearch } from "react-icons/bs";
import { FaTshirt } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { RiGridFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Button, FormGroup, Input } from "reactstrap";
import ownedImg1 from "../../../../../assets/owned-img1.png";
import NFTSideBar from "./nftsidebar";
//import Accordion from '@mui/material/Accordion';
//import AccordionSummary from '@mui/material/AccordionSummary';
//import AccordionDetails from '@mui/material/AccordionDetails';
//import Typography from '@mui/material/Typography';
//import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NftTabs1 = () => {
  const [filteredNft, setFilteredNft] = useState([]);

  useEffect(() => {
    getNftList();
  }, []);

  const getNftList = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let foo = params.get("id");

    Axios.get("/collection/all-users-collection")
      .then((response) => {
        if (response.data.status == "success") {
          let collectionList = response.data.data;
          let filteredCollectionList = collectionList.filter(
            (data) => data._id === foo
          );
          Axios.get("/nft/all-users-nft")
            .then((response2) => {
              if (response2.data.status == "success") {
                let nftList = response2.data.data;
                let filteredNfts = nftList.filter(
                  (data) => data.collectionId === filteredCollectionList[0]._id
                );
                setFilteredNft(filteredNfts);
              }
            })
            .catch((error) => {
              
            });
          // setCollectionList(filteredCollectionList)
        } else {
          // setCollectionList([])
        }
      })
      .catch((error) => {
        //   setCollectionList([])
        //   setUserRegistered(false)
        
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
            <div className="fltrRgtInn_Left">
              <div className="iftSrch">
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Search by NFTs"
                  />
                </FormGroup>
                <button>
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
                <Button>
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
          {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className='bold'>Status</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                <div className='statusList'>
                    <ul>
                        <li>
                            <FormGroup check>
                                <Label check>
                                    Buy now
                                    <Input type="checkbox" onChange={handleChange} value="Buy now" />
                                </Label>
                            </FormGroup>
                        </li>
                        <li>
                            <FormGroup check>
                                <Label check>
                                    On Auction
                                    <Input type="checkbox" onChange={handleChange} value="On Auction" />
                                </Label>
                            </FormGroup>
                        </li>
                        <li>
                            <FormGroup check>
                                <Label check>
                                    New
                                    <Input type="checkbox" onChange={handleChange} value="New" />
                                </Label>
                            </FormGroup>
                        </li>
                        <li>
                            <FormGroup check>
                                <Label check>
                                    Has Offers
                                    <Input type="checkbox" onChange={handleChange} value="Has Offers" />
                                </Label>
                            </FormGroup>
                        </li>
                    </ul>
                </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className='bold'>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                <div className='PriceOuter'>
                    <div className='priceSel'>
                        <FormGroup>
                            <Input type="select" name="select" placeholder='Trending' id="exampleSelect" onChange={ (e) => setOptions(e.target.value)} >
                                <option>KDA</option>
                            </Input>
                        </FormGroup>
                    </div>
                    <div className='pricemin'>
                        <FormGroup>
                            <Input type="number" name="min" id="min" placeholder="Min" onChange={ (e) => setMinAmount(e.target.value)} />
                        </FormGroup>
                    </div>
                    <div className='priceTo'>to</div>
                    <div className='pricemax'>
                        <FormGroup>
                            <Input type="number" name="max" id="max" placeholder="Max" onChange={ (e) => setMaxAmount(e.target.value)} />
                        </FormGroup>
                    </div>
                </div>
                <div className='loadmoreBtn'>
                    <button>Apply</button>
                </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className="bold" >Properties</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                <div className='collectionList'>
                    <div className='collectionSrch'>
                        <FormGroup>
                            <Input type="name" name="name" id="exampleName" placeholder="Search by collection"  onChange={ (e) => setSearchCollection(e.target.value)} />
                        </FormGroup>
                        <button><BsSearch /></button>
                    </div>
                </div>
          </Typography>
        </AccordionDetails>
      </Accordion> */}
        </div>
        <div className="nftFlt_Right">
          <div className="nftList">
            <ul>
              {filteredNft.length ? (
                filteredNft.map((data) => {
                  return (
                    <Link
                      to={{
                        pathname: "/marketplace/nft-overview",
                        search: `?id=${data._id}&for=all`,
                      }}
                    >
                      <li>
                        <div className="featItemBx">
                          <div className="featImg">
                            <img src={ownedImg1} alt="" />
                            <div className="tshirtIcon">
                              <FaTshirt />
                            </div>
                          </div>
                          <div className="feattitle">
                            <small>
                              KDA Punk <HiCheckCircle />
                            </small>
                            <span className="bold">
                              {data.description} #584
                            </span>
                          </div>
                          <div className="featpriceOut">
                            <div className="featprice">
                              <small>From</small>
                              <span className="bold">21 KDA</span>
                            </div>
                            <div className="featprice">
                              <small>Highest Bid</small>
                              <span className="bold">6.5 KDA</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </Link>
                  );
                })
              ) : (
                <h1>No NFTs</h1>
              )}
            </ul>
          </div>
          {/* <div className='loadmoreBtn'>
                            <button>Load More</button>
                        </div> */}
        </div>
      </div>
    </>
  );
};

export default NftTabs1;
