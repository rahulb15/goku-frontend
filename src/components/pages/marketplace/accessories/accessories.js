import React from "react";
import { Link } from "react-router-dom";
import AccessImg1 from "../../../../assets/access-img1.png";
import AccessImg2 from "../../../../assets/access-img2.png";
import AccessImg3 from "../../../../assets/access-img3.png";
import AccessImg4 from "../../../../assets/access-img4.png";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import "./accessories.scss";

const Accessories = () => {
  return (
    <div>
      <HeaderafterLogin />
      <div className="midSectionBx">
        <div className="container">
          <h2 className="accessoriesHd">Accessories</h2>
          <div className="catlogList">
            <ul>
              <li>
                <Link to="/">
                  <img src={AccessImg1} alt="" />
                  <span>Face Mask</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={AccessImg2} alt="" />
                  <span>Phone Case</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={AccessImg3} alt="" />
                  <span>Bags</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={AccessImg4} alt="" />
                  <span>Socks</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={AccessImg1} alt="" />
                  <span>Face Mask</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={AccessImg2} alt="" />
                  <span>Phone Case</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={AccessImg3} alt="" />
                  <span>Bags</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={AccessImg4} alt="" />
                  <span>Socks</span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={AccessImg4} alt="" />
                  <span>Socks</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
};

export default Accessories;
