import React, { Component } from 'react'
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import ExploreList from './explore-list-outer/explore-list'
import "./explore-merchandise.scss"

export default class CommunityMarketplace extends Component {
    render() {
        return (
            <div>

                {/* <MarketplaceHeader /> */}
                <HeaderafterLogin />
                <div className='midSectionBx'>
                    <div className='container'>
                        <div className='featCollectHd bold'>Explore Merchandise</div>
                        <div className='listing_TabOuter'>
                            <ExploreList />
                        </div>
                    </div>
                </div>
                <MarketplaceFooter />
            </div>
        )
    }

}