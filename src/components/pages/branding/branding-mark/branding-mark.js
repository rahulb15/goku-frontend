import React from "react";
import MarkLogo1 from "../../../../assets/mark-icon1.png";
import MarkLogo2 from "../../../../assets/mark-icon2.png";
import MarkLogo3 from "../../../../assets/mark-icon3.png";
import MarkLogo4 from "../../../../assets/mark-icon4.png";

const BrandingLogo = () => {
  return (
    <div>
      <div className="brandingLogoBx" id="slide3">
        <div className="stepBx">
          <i></i>
          <span>2</span>
        </div>
        <div className="mainHd">
          <h3 className="bold">Branding</h3>
          <h2 className="extrabold">Mark Only</h2>
        </div>
        <div className="brandLogoList">
          <ul>
            <li>
              <img src={MarkLogo1} alt="" />
            </li>
            <li>
              <img src={MarkLogo2} alt="" />
            </li>
            <li>
              <img src={MarkLogo3} alt="" />
            </li>
            <li className="gradientBg">
              <img src={MarkLogo4} alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BrandingLogo;
