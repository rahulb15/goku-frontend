import React from "react";
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
//import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import MpCrousal from "./mp-carousal";

export const MarketplaceAbout = () => {
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
            <h3 className="bold">Featured NFT Collection</h3>
            <h2 className="extrabold">
              <span className="extrabold">D.B.Cooper</span>
            </h2>
          </div>
          <div className="dbcooperList">
            <MpCrousal />
          </div>
        </div>
      </div>
    </div>
  );
};
