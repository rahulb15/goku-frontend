import React from "react";
import incorrectLogo4 from "../../../../assets/brandLogo1.png";
import incorrectLogo1 from "../../../../assets/incorrect-icon1.png";
import incorrectLogo2 from "../../../../assets/incorrect-icon2.png";
import incorrectLogo3 from "../../../../assets/incorrect-icon3.png";
import incorrectLogo6 from "../../../../assets/incorrect-icon4.png";
import incorrectLogo7 from "../../../../assets/incorrect-icon5.png";
import incorrectLogo8 from "../../../../assets/incorrect-icon6.png";

import SmallCross from "../../../../assets/cross-small.svg";
const BrandingLogo = () => {
  return (
    <div>
      <div className="brandingLogoBx" id="slide4">
        <div className="stepBx">
          <i></i>
          <span>3</span>
        </div>
        <div className="mainHd">
          <h3 className="bold">Branding</h3>
          <h2 className="extrabold">Incorrect Use</h2>
        </div>
        <div className="incorrectLogoList">
          <ul>
            <li>
              <i>
                <img src={incorrectLogo1} alt="" />
                <button>
                  <img src={SmallCross} alt="" />
                </button>
              </i>
              <span>Don’t distort or scratch the logo in any way</span>
            </li>
            <li>
              <i>
                <img src={incorrectLogo2} alt="" />
                <button>
                  <img src={SmallCross} alt="" />
                </button>
              </i>
              <span>Don’t add drop shadow</span>
            </li>
            <li>
              <i>
                <img src={incorrectLogo3} alt="" />
                <button>
                  <img src={SmallCross} alt="" />
                </button>
              </i>
              <span>Don’t add any kind of gradients</span>
            </li>
            <li>
              <i className="gradientBg">
                <img src={incorrectLogo4} alt="" />
                <button>
                  <img src={SmallCross} alt="" />
                </button>
              </i>
              <span>Do not use main logotype on colored backgrounds</span>
            </li>
            <li>
              <i>
                <img src={incorrectLogo4} alt="" />
                <button>
                  <img src={SmallCross} alt="" />
                </button>
              </i>
              <span>Don’t change letter spacing</span>
            </li>
            <li>
              <i>
                <img src={incorrectLogo6} alt="" />
                <button>
                  <img src={SmallCross} alt="" />
                </button>
              </i>
              <span>Don’t change the original solid color with an outline</span>
            </li>
            <li>
              <i>
                <img src={incorrectLogo7} alt="" />
                <button>
                  <img src={SmallCross} alt="" />
                </button>
              </i>
              <span>Do not centre lock-up</span>
            </li>
            <li>
              <i>
                <img src={incorrectLogo8} alt="" />
                <button>
                  <img src={SmallCross} alt="" />
                </button>
              </i>
              <span>Do not rotate the glyph</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BrandingLogo;
