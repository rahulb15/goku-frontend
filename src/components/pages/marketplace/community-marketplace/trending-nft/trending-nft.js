import React from "react";
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
//import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import TrendingCrousal from "./trending-carousal";

export const TrendingCrousalMain = () => {
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
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
            <TrendingCrousal />
          </div>
        </div>
      </div>
    </div>
  );
};
