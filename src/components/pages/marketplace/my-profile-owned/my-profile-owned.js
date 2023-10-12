import React, { Component } from 'react'
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import ProfileListingTab from './profile-listing-tab'
import { FaDiscord, FaKickstarterK } from "react-icons/fa";
import { BsFillShareFill, BsGlobe, BsTwitter, BsInstagram } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { Link } from "react-router-dom"
import CreatorImg from '../../../../assets/nft-img2.png'
import "./my-profile-owned.scss"
import Background from '../../../../assets/profile-banner.png'
import { useDispatch, useSelector } from 'react-redux';

const CommunityMarketplace = () => {
    const { walletAddress, userName } = useSelector(
        (state) => state.walletStatus
    );

    return (
        <div>
            {/* <MarketplaceHeader /> */}
            <HeaderafterLogin />
            <div className='creatorOuterBx' style={{ background: `url(${Background})`, }}>
                <div className='container'>
                    <div className='creatorDetBx'>
                        <div className='creatorImg'>
                            <img src={CreatorImg} alt="" />
                        </div>
                        <div className='creatorDet'>
                            <div className='creatorNameOuter'>
                                <div className='creatorName'>{userName}</div>
                                <div className='wishlist'>
                                    <span>
                                        <a href='/'><BsGlobe /></a>
                                        <a href='/'><BsTwitter /></a>
                                        <a href='/'><BsInstagram /></a>
                                        <a href='/'><FaDiscord /></a>
                                    </span>
                                    <button><BsFillShareFill /></button>
                                </div>
                            </div>

                            <div className='kryptoCont'>
                                The collection name here is a collection of 10,000 unique Collection NFTs— unique digital collectibles living on the Kadena blockchain. Your Collection doubles as your Collection membership card, and grants access to... <a href="">Show more</a>
                            </div>
                            <div className='editProf_Outer'>
                                <Link to='/marketplace/profile-setting'>Edit Profile</Link>
                                <span>
                                    <FaKickstarterK /> &nbsp;
                                    {walletAddress.slice(0, 8)}...  &nbsp;
                                    <MdOutlineContentCopy />
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='creatortabOuter'>
                    <div className='container'>
                        <ProfileListingTab />
                    </div>
                </div>
            </div>
            <MarketplaceFooter />
        </div>
    )
}

export default CommunityMarketplace