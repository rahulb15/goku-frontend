import React, { Component } from 'react'
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import {MarketplaceFooter} from '../../../common-components/marketplace-footer/marketplace-footer'
import NftListingTab from './nft-listing-tab'
import {Header} from '../../../common-components/header/header'
import "./nft-listing.scss"

const CommunityMarketplace=()=> {
        return (
            <div>

                {/* <MarketplaceHeader /> */}
               <HeaderafterLogin/>
                <div className='midSectionBx'>
                    <div className='container'>
                        <NftListingTab />
                    </div>
                </div>
                <MarketplaceFooter />
            </div>
        )
}

export default CommunityMarketplace