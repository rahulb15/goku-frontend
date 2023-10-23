import React, { Component } from 'react'
// import MarketplaceHeader from '../../../../components/common-components/marketplace-header/marketplace-header'
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import NftProjectSlider1 from './nft-project-slider1'
import NftProjectSlider2 from './nft-project-slider2'
import NftProjectSlider3 from './nft-project-slider3'
import NftProjectSlider4 from './nft-project-slider4'
import NftProjectSlider5 from './nft-project-slider5'
import NftProjectSlider6 from './nft-project-slider6'
//import { Header } from '../../../common-components/header/header'
import "./nft-projects.scss"

export default class CommunityMarketplace extends Component {
    render() {
        return (
            <div>
                {/* <MarketplaceHeader /> */}
                <HeaderafterLogin />
                <div className='midSectionBx'>
                    <div className='container'>
                        <div className='featCollectHd bold'>{"Featured NFT Collections"}</div>
                        <NftProjectSlider1 />
                        <NftProjectSlider2 />
                        {/* <NftProjectSlider3 />
                        <NftProjectSlider4 />
                        <NftProjectSlider5 />
                        <NftProjectSlider6 /> */}
                    </div>
                </div>
                <MarketplaceFooter />
            </div>
        )
    }
}