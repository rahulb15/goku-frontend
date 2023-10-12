import React from "react";
import { useSelector } from "react-redux";
import SellingCrousal from "./selling-carousal";

export const BestSelling = () => {
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
              <span className="extrabold">Best Selling Merchandise </span>
            </h2>
          </div>
          <div className="dbcooperList">
            <SellingCrousal />
          </div>
        </div>
      </div>
    </div>
  );
};
