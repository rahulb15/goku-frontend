import React, { Component, useState, useEffect } from "react";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import ProfileListingTab from "./profile-listing-tab";
import { FaDiscord, FaKickstarterK } from "react-icons/fa";
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

export default function CommunityMarketplace() {
  const [collectionName, setCollectionName] = useState("");
  const [collectionData, setCollectionData] = useState();
  const [filteredNft, setFilteredNft] = useState([]);
  const [refresh, setRefresh] = useState(false);
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
        //   setCollectionList([])
        //   setUserRegistered(false)
        
      });
  };
  //
  //
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
                    <BsFillShareFill />
                  </button>
                </div>
              </div>

              <div className="kryptoCont">
                The collection name here is a collection of 10,000 unique
                Collection NFTs— unique digital collectibles living on the
                Kadena blockchain. Your Collection doubles as your Collection
                membership card, and grants access to...{" "}
                <a href="">Show more</a>
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
                <Link to="/marketplace/profile-setting">Edit Profile</Link>
              </div>
            </div>
          </div>
        </div>
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
