import React, { Component } from 'react'
// import MarketplaceHeader from '../../../../components/common-components/marketplace-header/marketplace-header'
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import CollectionSlider1 from './designer-collection-slider1'
import CollectionSlider2 from './designer-collection-slider2'
import CollectionSlider3 from './designer-collection-slider3'
import CollectionSlider4 from './designer-collection-slider4'
import "./designer-collection.scss"

export default class CommunityMarketplace extends Component {
    render() {
        return (
            <div>
                {/* <MarketplaceHeader /> */}
                <HeaderafterLogin />
                <div className='midSectionBx'>
                    <div className='container'>
                        <div className='featCollectHd bold'>Designer Collection</div>
                        <CollectionSlider1 />
                        <CollectionSlider2 />
                        <CollectionSlider3 />
                        <CollectionSlider4 />
                    </div>
                </div>
                <MarketplaceFooter />
            </div>
        )
    }

}