import React, { Component, useEffect, useState } from 'react'
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import Overdetail from './overviewDetail'
import OverviewTabs from './overviewtabs/overviewTabs'
import HistoryAccordian from './historyaccordian'
//import MoreCollection from '../community-marketplace/trending-nft/trending-carousal'
import { Header } from '../../../common-components/header/header'
import Axios from 'axios';
//import { Link } from "react-router-dom";
import "./nft-overview.scss"
// import MrchendImg1 from '../../../../assets/nft-img1.png'
// import MrchendImg2 from '../../../../assets/nft-img2.png'
// import MrchendImg3 from '../../../../assets/nft-img3.png'
// import MrchendImg4 from '../../../../assets/nft-img4.png'
// import { FaTshirt } from "react-icons/fa";
// import { HiCheckCircle } from "react-icons/hi";
import { useSelector } from "react-redux"

//Owl Carousel Libraries and Module
//import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const CommunityMarketplace = () => {
    const { isLoading, isAuth, error } = useSelector(
        (state) => state.loginStatus
    );
    const options = {
        responsiveClass: true,
        nav: false,
        margin: 20,
        autoplay: false,
        navText: ["Prev", "Next"],
        smartSpeed: 1000,
        loop: true,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 2,
            },
            600: {
                items: 2,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 4,
            }
        },
    };
   



    return (
        <div>

            {isAuth ? <HeaderafterLogin /> : <Header />}
            <div className='midSectionBx'>
                <div className='container'>
                    <Overdetail  />
                    <div className='overviewTabouterBx'>
                        <div className='overviewTabLeft'>
                            <OverviewTabs  />
                        </div>
                        <div className='overviewtabRight'>
                            <HistoryAccordian  />
                        </div>
                    </div>
                    {/* <div className='moreCollection'>
                            <div className='market_mainHd'>
                                <h2 className='extrabold'>More From This Collection</h2>
                            </div> */}
                    {/* <MoreCollection filtered={filteredNft} /> */}
                    {/* <div>
           
        </div>
                           <div class="seeall"><button class="btn btn-secondary">See More</button></div> 
                        </div> */}
                </div>
            </div>
            <MarketplaceFooter />
        </div>
    )


}

export default CommunityMarketplace