import React, { Component } from "react";
import CollectImg1 from "../../../../../assets/collection-img1.png";
import CollectImg2 from "../../../../../assets/collection-img2.png";
import CollectImg3 from "../../../../../assets/collection-img3.png";
import CollectImg4 from "../../../../../assets/collection-img4.png";
import CollectImg5 from "../../../../../assets/collection-img5.png";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Axios from "axios";
//import CollectImg6 from '../../../../../assets/collection-img6.png'

export default function OverviewTab1(props) {
  const [bigs, setBigs] = useState([]);
  const [floorPrice, setFloorPrice] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  let foo = params.get("id");
  let foo2 = params.get("for");

  const getAllAuction = () => {
    const body = {
      _id: foo,
    };
    if (foo2 == "all") {
      Axios.post("/passDetails/all-nft-bids", body, {
        headers: { authorization: localStorage.getItem("accessJWT") },
      })
        .then((response) => {
          if (response.data.status == "success") {
            setBigs(response.data.data[0].bidInfo);
            setFloorPrice(response.data.data[0].nftPrice);
            setTokenId(response.data.data[0].tokenId);
            setCollectionName(response.data.data[0].collectionName);
          } else {
            setBigs([]);
            setTokenId("");
            setFloorPrice("");
            setCollectionName("");
          }
        })
        .catch((error) => { });
    }
  };

  const getAllCollectionById = () => {
    const body = {
      _id: foo,
    };
    if (foo2 == "all") {
      Axios.post("/nft/getNftbyId", body, {
        headers: { authorization: localStorage.getItem("accessJWT") },
      })
        .then((response) => {
          if (response?.data?.status == "success") {
            setBigs(response?.data?.data[0]?.bidInfo);
            setFloorPrice(response?.data?.data[0]?.nftPrice);
            setTokenId(response?.data?.data[0]?.tokenId);
            setCollectionName(response?.data?.data[0]?.collectionName);
          } else {
            setBigs([]);
            setTokenId("");
            setFloorPrice("");
            setCollectionName("");
          }
        })
        .catch((error) => { });
    } else {
      console.log("pass");
      Axios.post("/passDetails/getNftPassbyId", body)
        .then((response) => {
          if (response?.data?.status == "success") {
            setBigs(response?.data?.data[0]?.bidInfo);
            setFloorPrice(response?.data?.data[0]?.passCost);
            setTokenId(response?.data?.data[0]?.tokenId);
            setCollectionName(response?.data?.data[0]?.collectionName);
          } else {
            setBigs([]);
            setTokenId("");
            setFloorPrice("");
            setCollectionName("");
          }
        })
        .catch((error) => { });
    }
  };

  useEffect(() => {
    getAllAuction();
    getAllCollectionById();
  }, []);
  console.log(bigs)
  return (
    <div>
      <div className='latestBidBx'>
        <h3>Latest Bids</h3>
        {bigs?.length > 0 &&
          bigs
            ?.filter(item => {
              return (item.bidPrice !== null && item.bidPrice !== "") && (item.bidder !== null && item.bidder !== "");
            })
            .slice(0, 5)
            ?.map((item, index) => {
              item.bidTime = new Date(item?.bidTime)
                ?.toISOString()
                ?.slice(0, 19)
                ?.replace('T', ' ');

              return (
                <ul key={index}>
                  <li>
                    <div
                      className='collectionLeft'
                      style={
                        nightModeStatus
                          ? { color: 'white' }
                          : { color: 'black' }
                      }
                    >
                      <strong>{(item?.bidder)?.slice(0, 12)}...{(item?.bidder)?.slice(-5)}</strong>
                      <small>Floor: {floorPrice} KDA <a href=''>Floor Bid</a></small>
                    </div>
                    <div
                      className='collectionRight'
                      style={
                        nightModeStatus
                          ? { color: 'white' }
                          : { color: 'black' }
                      }
                    >
                      <strong>{item?.bidPrice} KDA</strong>
                      <small>{(item?.bidTime).toString()}</small>
                    </div>
                  </li>
                </ul>
              );
            })}
        {bigs?.length === 0 ? (
          <a
            href='#'
            style={
              nightModeStatus
                ? { color: 'white' }
                : { color: 'black' }
            }
          >
            No Bids Yet
          </a>
        ) : null}
      </div>

      <div className='detailsBid'>
        <h3>Details</h3>
        <ul>
          <li>
            <div className='biddetLeft'>Contract Address</div>
            <div className='biddetRight' style={{ wordBreak: 'break-all' }}>
              <a
                href='#'
                style={
                  nightModeStatus
                    ? { color: 'white' }
                    : { color: 'black' }
                }
              >
                {collectionName === 'pass3'
                  ? 'pass'
                  : collectionName === 'dbcooper'
                    ? 'dbcooper'
                    : 'free.merchfinal001'}
              </a>
            </div>
          </li>
          <li>
            <div className='biddetLeft'>Token ID.</div>
            <div className='biddetRight' style={{ wordBreak: 'break-all' }}>
              <a
                href='#'
                style={
                  nightModeStatus
                    ? { color: 'white' }
                    : { color: 'black' }
                }
              >
                {foo2 === 'all'
                  ? tokenId?.slice(0, 5) + '...' + tokenId?.slice(-5)
                  : tokenId}
              </a>
            </div>
          </li>
          <li>
            <div className='biddetLeft'>Token Standard</div>
            <div className='biddetRight'>Marmalade</div>
          </li>
          <li>
            <div className='biddetLeft'>Blockchain</div>
            <div className='biddetRight'>Kadena</div>
          </li>
          <li>
            <div className='biddetLeft'>Metadata</div>
            <div className='biddetRight'>Centralized</div>
          </li>
          {/* Add more list items for details if needed */}
        </ul>
      </div>
    </div>
  );
}






