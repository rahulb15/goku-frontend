import React, { Component } from 'react'
// import MarketplaceHeader from '../../../../components/common-components/marketplace-header/marketplace-header'
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import { useSelector } from "react-redux"
import CollectionsTabs from './collections-tabs'
import "./explore-collections.scss"
import { Header } from '../../../common-components/header/header'

const ExploreCollections = () => {
    const { isLoading, isAuth, error } = useSelector(
        (state) => state.loginStatus
    );

    return (
        <div>
            {/* <MarketplaceHeader /> */}
            {isAuth ? <HeaderafterLogin /> : <Header />}
            <div className='midSectionBx'>
                <div className='container'>
                    <div className='featCollectHd bold'>Explore Collections</div>
                    <CollectionsTabs />
                </div>
            </div>
            <MarketplaceFooter />
        </div>
    )
}

export default ExploreCollections