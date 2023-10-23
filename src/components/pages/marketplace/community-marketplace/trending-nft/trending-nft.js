import React,{useEffect,useState}from "react";
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
//import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import TrendingCrousal from "./trending-carousal";
import Axios from "axios";

export const TrendingCrousalMain = () => {
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    Axios.get("/nft/all-users-nft-views", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        console.log(response.data.data, "response");
        if (response.data.status == "success") {
          let nfts = response.data.data;
          setNfts(nfts);
         

          // setCollectionList(filteredCollectionList)
        } else {
          setNfts([]);
        }
      })
      .catch((error) => {
        setNfts([]);
      });
  } , []);

  console.log(nfts, "nftsTrending")
  return (
    <div>
      <div className="marketplaceAbout">
        <div className="container">
          <div
            className={
              nightModeStatus ? "market_mainHd" : "market_mainHd_Night"
            }
          >
            <h2 className="extrabold">
              <span className="extrabold">Trending NFTs </span>
            </h2>
          </div>
          <div className="dbcooperList">
            {nfts.length > 0 && <TrendingCrousal items={nfts} />}
            {/* <TrendingCrousal items={nfts} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
