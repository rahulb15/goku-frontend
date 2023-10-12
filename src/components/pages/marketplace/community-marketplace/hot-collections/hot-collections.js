import React from "react";
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
//import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import HotCollectionsTab from "./hot-collections-tab";

export const HotCollections = () => {
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
              <span className="extrabold">Hot Collections </span>
            </h2>
          </div>
          <HotCollectionsTab />
        </div>
      </div>
    </div>
  );
};
