import React from "react";
import BrandLogo1 from "../../../../assets/brandLogo1.png";
import BrandLogo2 from "../../../../assets/logo-black.png";
import BrandLogo4 from "../../../../assets/logo-full-white.png";
import BrandLogo3 from "../../../../assets/logo-white.png";

const BrandingLogo = () => {
  return (
    <div>
      <div className="brandingLogoBx" id="slide2">
        <div className="stepBx">
          <i></i>
          <span>1</span>
        </div>
        <div className="mainHd">
          <h3 className="bold">Branding</h3>
          <h2 className="extrabold">
            Our Logo
            <small>Feel free to use our logo in color, black or white</small>
          </h2>
        </div>
        <div className="brandLogoList">
          <ul>
            <li>
              <img src={BrandLogo1} alt="" />
            </li>
            <li>
              <img src={BrandLogo2} alt="" />
            </li>
            <li className="blackBg">
              <img src={BrandLogo3} alt="" />
            </li>
            <li className="gradientBg">
              <img src={BrandLogo4} alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BrandingLogo;
