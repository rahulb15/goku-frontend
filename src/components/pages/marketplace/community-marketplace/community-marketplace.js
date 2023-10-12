import React from "react";
// import MarketplaceHeader from '../../../../components/common-components/marketplace-header/marketplace-header'
import { useSelector } from "react-redux";
import { MarketplaceFooter } from "../../../../components/common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../../components/common-components/marketplace-header-after-login/marketplace-header-after-login";
import { Header } from "../../../common-components/header/header";
import { BestSelling } from "./best-selling/best-selling";
import { BrowseCategory } from "./browse-category/browse-category";
import "./community-marketplace.scss";
import { FeaturedMerchandies } from "./featured-merchandies/featured-merchandies";
import { HotCollections } from "./hot-collections/hot-collections";
import { MarketplaceAbout } from "./marketplace-about/marketplace-about";
import { MarketplaceBanner } from "./marketplace-banner/marketplace-banner";
import { SellNft } from "./sell-nft/sell-nft";
import { TrendingCrousalMain } from "./trending-nft/trending-nft";

const CommunityMarketplace = () => {
  const { isLoading, isAuth, error } = useSelector(
    (state) => state.loginStatus
  );

  return (
    <div>
      {/* <MarketplaceHeader /> */}
      {isAuth ? <HeaderafterLogin /> : <Header />}
      {/* <Header/> */}
      <MarketplaceBanner />
      <MarketplaceAbout />
      <FeaturedMerchandies />
      <HotCollections />
      <TrendingCrousalMain />
      <BestSelling />
      <SellNft />
      <BrowseCategory />
      <MarketplaceFooter />
    </div>
  );
};

export default CommunityMarketplace;
