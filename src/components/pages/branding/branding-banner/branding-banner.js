import React from "react";
import KryptoLogo from "../../../../assets/prodOwner2.png";

const BrandingBanner = () => {
  return (
    <div>
      <div className="brandingBannerBx" id="slide1">
        <h2 className="extrabold">
          How To Use
          <br />
          Kryptomerch,s
          <br />
          Brand Assets
        </h2>
        <button>Download Brand Assets</button>
        <i>
          <img src={KryptoLogo} alt="" />
        </i>
        <small>EXPLORE THE VERTICAL WAY</small>
      </div>
    </div>
  );
};

export default BrandingBanner;
