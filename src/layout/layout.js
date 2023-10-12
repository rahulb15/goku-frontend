import React, { Component } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute"
import Home from '../components/pages/home/home';
import Toknomics from '../components/pages/toknomics/toknomics';
import Faq from '../components/pages/faq/faq';
import FaqDetail from '../components/pages/faq-detail/faq-detail'
import PrivacyPolicy from '../components/pages/privacy-policy/privacy-policy'
import TermsService from '../components/pages/terms-service/terms-service'
import Contact from '../components/pages/contact/contact'
import GettingStarted from '../components/pages/getting-started/getting-started';
import GettingStartedDetail from '../components/pages/getting-started-detail/getting-started-detail';
import SubmitRequest from '../components/pages/submit-request/submit-request';
import HowitWorks from '../components/pages/how-it-works/how-it-works';
import MyWishlist from '../components/pages/my-wishlist/my-wishlist';
import Jobs from '../components/pages/jobs/jobs';
import JobDetail from '../components/pages/job-detail/job-detail';
import BugBounty from '../components/pages/bug-bounty/bug-bounty';
import KDMToken from '../components/pages/kdm-token/kdm-token';
import Branding from '../components/pages/branding/branding';
import Guidelines from '../components/pages/guidelines/guidelines';
import Launchpad from '../components/pages/launchpad/launchpad'
import LaunchpadDetail from '../components/pages/launchpad-detail/launchpad-detail'
import IntellectualPropertyPolicy from '../components/pages/intellectual-property-policy/intellectual-property-policy'
import CommunityMarketplace from '../components/pages/marketplace/community-marketplace/community-marketplace'
import NftListing from '../components/pages/marketplace/nft-listing/nft-listing'
import NftOverview from '../components/pages/marketplace/nft-overview/nft-overview'
import CreateNft from '../components/pages/marketplace/create-nft/create-nft'
import CreatorOwned from '../components/pages/marketplace/creator-owned/creator-owned'
import NftProjects from '../components/pages/marketplace/nft-projects/nft-projects'
import ExploreMerchandise from '../components/pages/marketplace/explore-merchandise/explore-merchandise'
import Cart from '../components/pages/marketplace/cart/cart'
import MyProfileOwned from '../components/pages/marketplace/my-profile-owned/my-profile-owned'
import ExploreCollections from '../components/pages/marketplace/explore-collections/explore-collections'
import DesignerCollections from '../components/pages/marketplace/designer-collection/designer-collection'
import CollectionListing from '../components/pages/marketplace/collection-listing/collection-listing'
import CollectionListingLogin from '../components/pages/marketplace/collection-listing/login-collection-listing'
import MyCollectionDetails from '../components/pages/marketplace/my-collection-detail/my-collection-detail'
import ProfileSetting from '../components/pages/marketplace/profile-setting/profile-setting'
import CreateMerchandise from '../components/pages/marketplace/create-merchandise/create-merchandise'
import Blog from '../components/pages/marketplace/blog/blog'
import BlogDetail from '../components/pages/marketplace/blog-detail/blog-detail'
import HelpCenter from '../components/pages/marketplace/help-center/help-center'
import Accessories from '../components/pages/marketplace/accessories/accessories'
import AccessoriesListing from '../components/pages/marketplace/accessories-listing/accessories-listing'
import MerchandiseDetail from '../components/pages/marketplace/merchandise-detail/merchandise-detail'
import Checkout from '../components/pages/marketplace/checkout/checkout'
import CustomizeMerchandise from '../components/pages/marketplace/customize-merchandise/customize-merchandise'
import CustomizeMerchandiseDetail from '../components/pages/marketplace/customize-merchandise-detail/customize-merchandise-detail'
import { Header } from '../components/common-components/header/header'

export default class Layout extends Component {
    render() {
        return (
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/toknomics" element={<Toknomics />} />
                <Route exact path="/faq" element={<Faq />} />
                <Route exact path='/faq-detail/:id' element={<FaqDetail />} />
                <Route exact path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route exact path='/terms-service' element={<TermsService />} />
                <Route exact path='/launchpad' element={<Launchpad />} />
                <Route exact path='/launchpad/:id' element={<LaunchpadDetail />} />
                <Route exact path='/intellectual-property-policy' element={<IntellectualPropertyPolicy />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path="/getting-started" element={<GettingStarted />} />
                <Route exact path="/getting-started-detail" element={<GettingStartedDetail />} />
                <Route exact path="/submit-request" element={<SubmitRequest />} />
                <Route exact path="/how-it-works" element={<HowitWorks />} />
                <Route exact path="/wishlist" element={<MyWishlist />} />
                <Route exact path="/jobs" element={<Jobs />} />
                <Route exact path="/job-detail" element={<JobDetail />} />
                <Route exact path="/bug-bounty" element={<BugBounty />} />
                <Route exact path="/kdm-token" element={<KDMToken />} />
                <Route excect path='/branding' element={<Branding />} />
                <Route excect path='/guidelines' element={<Guidelines />} />
                {/* Marketplace */}
                <Route exact path="/marketplace" element={<CommunityMarketplace />} />
                <Route exact path="/marketplace/nft-listing" element={<NftListing />} />
                <Route exact path="/marketplace/nft-overview" element={<NftOverview />} />
                <Route exact path="/marketplace/create-nft" element={<ProtectedRoute><CreateNft /></ProtectedRoute>} />
                <Route exact path="/marketplace/create-owned" element={<ProtectedRoute>
                    <CreatorOwned />
                </ProtectedRoute>} />
                <Route exact path="/marketplace/nft-projects" element={<NftProjects />} />
                <Route exact path="/marketplace/explore-merchandise" element={<ExploreMerchandise />} />
                <Route exact path="/marketplace/cart" element={<Cart />} />
                <Route exact path="/marketplace/my-profile-owned/" element={<MyProfileOwned />} />
                <Route exact path="/marketplace/explore-collections" element={<ExploreCollections />} />
                <Route exact path="/marketplace/designer-collections" element={<DesignerCollections />} />
                <Route exact path="/marketplace/collection-listing" element={<CollectionListing />} />
                <Route exact path="/marketplace/collection-listing-allusers" element={<CollectionListingLogin />} />
                <Route exact path="/marketplace/my-collection-detail" element={<MyCollectionDetails />} />
                <Route exact path='/marketplace/profile-setting' element={<ProtectedRoute><ProfileSetting /></ProtectedRoute>} />
                <Route exact path='/marketplace/create-merchandise' element={<CreateMerchandise />} />
                <Route exact path='/marketplace/blog' element={<Blog />} />
                <Route exact path='/marketplace/blog-detail' element={<BlogDetail />} />
                <Route exact path='/marketplace/help-center' element={<HelpCenter />} />
                <Route exact path='/marketplace/accessories' element={<Accessories />} />
                <Route exact path='/marketplace/accessories-listing' element={<AccessoriesListing />} />
                <Route exact path='/marketplace/merchandise-detail' element={<MerchandiseDetail />} />
                <Route exact path='/marketplace/checkout' element={<Checkout />} />
                <Route exact path='/marketplace/customize-merchandise' element={<CustomizeMerchandise />} />
                <Route exact path='/marketplace/customize-merchandise-detail' element={<CustomizeMerchandiseDetail />} />
            </Routes>
        )
    }
}