import React, { Component } from 'react'
//import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import NftListingTab from './nft-listing-tab'
import { AiOutlineStar } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import CreatorImg from '../../../../assets/creator-img.png'
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../../common-components/header/header'
import "./creator-owned.scss"
import Background from '../../../../assets/creator-banner.png'

const CommunityMarketplace = () => {
    const { walletStatus, walletAddress, userName } = useSelector(
        (state) => state.walletStatus
    );
    return (
        <div>
            {/* <MarketplaceHeader /> */}
            <Header />
            <div className='creatorOuterBx' style={{ background: `url(${Background})`, }}>
                <div className='container'>
                    <div className='creatorDetBx'>
                        <div className='creatorImg'>
                            <img src={CreatorImg} alt="" />
                        </div>
                        <div className='creatorDet'>
                            <div className='creatorNameOuter' >
                                <div className='creatorName' >{userName}  <HiCheckCircle /></div>
                                <div className='wishlist'>
                                    <button><AiOutlineStar /></button>
                                    <button><BsFillShareFill /></button>
                                </div>
                            </div>
                            <div className='kryptoId' >
                                <div className='kryptoInn' >
                                    {walletAddress.slice(0, 8)}...&nbsp;
                                    <MdOutlineContentCopy style={{ cursor: 'pointer' }} onClick={() => {
                                        navigator.clipboard.writeText(walletAddress)

                                    }} />
                                </div>
                                {/* <div className='kryptocreator'>
                                        Created By
                                        <strong>KDA Punk</strong>
                                    </div> */}
                            </div>
                            {/* <div className='kryptoCont'>
                                    The collection name here is a collection of 10,000 unique Collection NFTs— unique digital collectibles living on the Kadena blockchain. Your Collection doubles as your Collection membership card, and grants access to... <a href="">Show more</a>
                                </div> */}
                        </div>
                    </div>

                </div>
                <div className='creatortabOuter'>
                    <div className='container'>
                        <NftListingTab />
                    </div>
                </div>
            </div>
            <MarketplaceFooter />
        </div>
    )
}

export default CommunityMarketplace