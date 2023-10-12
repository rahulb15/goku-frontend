import React from "react";
import SketchingImg from "../../../../assets/sketching-img.png";

const BrandingLogo = () => {
  return (
    <div>
      <div className="brandingLogoBx" id="slide6">
        <div className="stepBx">
          <i></i>
          <span>5</span>
        </div>
        <div className="mainHd">
          <h3 className="bold">Branding</h3>
          <h2 className="extrabold">Spacings</h2>
        </div>
        <div className="spacingBx">
          <img src={SketchingImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BrandingLogo;
