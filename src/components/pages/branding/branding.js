import React from "react";
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { MarketplaceFooter } from "../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import BrandingBanner from "./branding-banner/branding-banner";
import BrandingBullets from "./branding-bullets/branding-bullets";
import BrandingColor from "./branding-color/branding-color";
import BrandingLogo from "./branding-logo/branding-logo";
import BrandingMark from "./branding-mark/branding-mark";
import BrandingSpecing from "./branding-spacing/branding-spacing";
import "./branding.scss";
import DownloadBrand from "./download-brand/download-brand";
import IncorrectUse from "./incorrect-use/incorrect-use";
import RelatedProducts from "./related-products/related-products";

const BugBounty = () => {
  return (
    <div>
      {/* <MarketplaceHeader /> */}
      <HeaderafterLogin />
      <div className="midSectionBx">
        <div className="container">
          <BrandingBanner />
          <BrandingLogo />
          <BrandingMark />
          <IncorrectUse />
          <BrandingColor />
          <BrandingSpecing />
          <RelatedProducts />
          <DownloadBrand />
        </div>
      </div>
      <MarketplaceFooter />
      <BrandingBullets />
    </div>
  );
};

export default BugBounty;
