import React from "react";
import { MarketplaceFooter } from "../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import Collectors from "./collectors/collectors";
import Creators from "./creators/creators";
import GuidelineBullets from "./guideline-bullets/guideline-bullets";
import GuidelinesAbout from "./guidelines-about/guidelines-about";
import GuidelinesBanner from "./guidelines-banner/guidelines-banner";
import "./guidelines.scss";

const Guideline = () => {
  return (
    <div>
      {/* <MarketplaceHeader /> */}
      <HeaderafterLogin />
      <div className="midSectionBx">
        <div className="container">
          <GuidelinesBanner />
          <GuidelinesAbout />
          <Creators />
          <Collectors />
        </div>
      </div>
      <MarketplaceFooter />
      <GuidelineBullets />
    </div>
  );
};

export default Guideline;
