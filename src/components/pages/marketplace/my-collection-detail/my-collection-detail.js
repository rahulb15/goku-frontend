import React, { Component, useState, useEffect } from "react";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import ProfileListingTab from "./profile-listing-tab";
import { FaDiscord, FaKickstarterK } from "react-icons/fa";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import {
  BsFillShareFill,
  BsGlobe,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import CreatorImg from "../../../../assets/nft-img2.png";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import "./my-collection-detail.scss";
import Background from "../../../../assets/profile-banner.png";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default function CommunityMarketplace() {
  const [collectionName, setCollectionName] = useState("");
  const [collectionData, setCollectionData] = useState();
  const [filteredNft, setFilteredNft] = useState([]);
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [tokenList, setTokenList] = useState([]);
  const { walletStatus, walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  //   const navigate = useNavigate();
  
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo = params.get("id");
  

  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = () => {
    Axios.get(`/collection/user-collection-by-id2?id=${foo}`, {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        
        if (response.data.status == "success") {
          console.log(response.data.data[0], "collection data");
          // setCollectionName(response.data.data[0].collectionName);
          setCollectionData(response.data.data[0]);
        }
      })
      .catch((error) => {
        //   setUserRegistered(false)
        console.log(error);
        
      });
  };

  useEffect(() => {
    getNft();
  }, [refresh]);

  const getNft = () => {
    Axios.get("/nft/user-nft", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        
        if (response.data.status == "success") {
          let nftList = response.data.data;
          const search = window.location.search;
          const params = new URLSearchParams(search);
          let foo = params.get("id");

          let filteredNftList = nftList.filter(
            (data) => data.collectionId === foo
          );
          
          const list = filteredNftList.filter((item) => {
            if (item.onMarketplace == false) {
              return item;
            }
          });
          setFilteredNft(list);
          // setCollectionList(filteredCollectionList)
        } else {
          // setCollectionList([])
          setFilteredNft([]);
          
        }
      })
      .catch((error) => {
        setFilteredNft([]);
        console.log(error);
        //   setCollectionList([])
        //   setUserRegistered(false)
        
      });
  };
  //
  //
  const shareToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link Copied");
  }

  const toggle = () => {
    setModal(!modal);
  };


  const handleTokenList = (e) => {
    if (e.length == 0) {
      setTokenList([]);
    }
    const arr = e.map((item) => {
      if (item.split(",").length > 1) {
        //regular expression to remove all special characters except comma
        const regex = /[^a-zA-Z0-9,]/g;
        const str = item.replace(regex, "");
        setTokenList(str.split(","));
      } else {
        setTokenList(e);
      }
    });
  };

  const handleOnSubmit = () => {
    if (tokenList.length == 0) {
      toast.error("Please enter token list to add" , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      //add function here
      console.log(tokenList, "tokenList");
      setModal(!modal);
    }
  };

  return (
    <div>
      {/* <MarketplaceHeader /> */}
      <HeaderafterLogin />
      <div
        className="creatorOuterBx"
        style={{ background: `url(${Background})` }}
      >
        <div className="container">
          <div className="creatorDetBx">
            <div className="creatorImg">
              <img src={collectionData?.collection_info[0]?.imageUrl} alt="" />
            </div>
            <div className="creatorDet">
              <div className="creatorNameOuter">
                <div className="creatorName">{collectionData?.collection_info[0]?.collectionName}</div>
                <div className="wishlist">
                  <button>
                    <BsFillShareFill onClick={shareToClipboard} />
                  </button>
                </div>
              </div>

              <div className="kryptoCont">
                {/* The collection name here is a collection of 10,000 unique
                Collection NFTsd— unique digital collectibles living on the
                Kadena blockchain. Your Collection doubles as your Collection
                membership card, and grants access to...{" "} */}
                {/* <a href="">Show more</a> */}
                {collectionData?.collection_info[0] ? collectionData?.collection_info[0]?.collectionInfo : "The collection name here is a collection of 10,000 unique Collection NFTsd— unique digital collectibles living on the Kadena blockchain. Your Collection doubles as your Collection membership card, and grants access to..."}
              </div>
              <div className="items_qty">
                <div className="itemQtyBx">
                  <small>Items</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                    {collectionData?.collection_info[0]?.totalSupply}
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Owners</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                    {collectionData?.totalNftUser}
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Total Volume</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                     {collectionData?.totalNftPrice} KDA
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Floor Price</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                     {collectionData?.minNftPrice} KDA
                  </strong>
                </div>
              </div>
              <div className="editProf_Outer">
                <button className="editProf" onClick={toggle}>
                   Add Token</button>
                {/* <Link to="/marketplace/profile-setting">Edit Profile</Link> */}
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={modal} toggle={toggle} style={{ marginTop: "300px" }}>
        <ModalBody>
          <div className="modalContent">
          <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>
                  Token List
                </Label>
                <br />
                <span style={{ color: "black" }}>
                  Enter multiple tokens by separating them with a comma (,).
                </span>
                {/* <Input
                  type="email"
                  name="tokenList"
                  onChange={handleOnChange}
                  value={tokenList}
                  id="exampleEmail"
                  placeholder="Enter token list"
                /> */}
                <TagsInput
                  value={tokenList}
                  onlyUnique={true}
                  onChange={handleTokenList}
                  inputProps={{
                    placeholder: "Enter token list",
                  }}
                />
                <span style={{ color: "black" }}>
                  {tokenList.length} tokens added
                </span>
              </FormGroup>
            </div>
            <div className="collectionFrmBtn">
              <Button onClick={handleOnSubmit}>Add Token</Button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="collectionFooter">
          <Button className="closeModal" onClick={toggle}>
            x
          </Button>
        </ModalFooter>
      </Modal>
        <div className="creatortabOuter">
          <div className="container">
            <ProfileListingTab
              filteredNft={filteredNft}
              collectionData={collectionData}
              setRefresh={setRefresh}
              refresh={refresh}
              collectionName={collectionName}
            />
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
}
