import React from "react";
import { FaLink } from "react-icons/fa";
import { useSelector } from "react-redux";

const ChainIcon = () => {
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  return (
    <>
      <FaLink
        style={{
          color: nightModeStatus ? "white" : "black",
          fontSize: "15px",
          marginRight: "5px",
          marginBottom: "5px",
        }}
        data-tip
        data-for="chainId"
      />
    </>
  );
};

export default ChainIcon;
