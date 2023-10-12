import React from "react";

const BrandingLogo = () => {
  return (
    <div>
      <div className="brandingLogoBx" id="slide5">
        <div className="stepBx">
          <i></i>
          <span>4</span>
        </div>
        <div className="mainHd">
          <h3 className="bold">Branding</h3>
          <h2 className="extrabold">
            Colors
            <small>
              You can’t edit, change, distort, recolor, or reconfigure the
              Kryptomerch logo.
              <br />
              And, of course, don’t use our Logo to refer to any product or
              service that’s not Kryptomerch
            </small>
          </h2>
        </div>
        <div className="colorsList">
          <ul>
            <li className="yellowBg blackclr">
              <strong>Yellow</strong>
              <span>#E0E21A</span>
              <small>CMYK, 11, 4, 92, 1</small>
            </li>
            <li className="blackBg whiteclr">
              <strong>Black</strong>
              <span>#00000</span>
              <small>CMYK, 0, 0, 0, 1</small>
            </li>
            <li className="whiteBg blackclr">
              <strong>White</strong>
              <span>#ffffff</span>
              <small>CMYK, 255, 255, 255, 1</small>
            </li>
            <li className="greyBg whiteclr">
              <strong>Gray</strong>
              <span>#808080</span>
              <small>CMYK, 48, 37, 37, 18</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BrandingLogo;
