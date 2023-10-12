import React from 'react'
import { MarketplaceFooter } from '../../common-components/marketplace-footer/marketplace-footer'
import HeaderafterLogin from '../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import SubmitRequestTab from './submit-request-tab'
import "./submit-request.scss"

const SubmitRequest = () => {
    return (
        <div>
            {/* <MarketplaceHeader /> */}
            <HeaderafterLogin />
            <div className='midSectionBx'>
                <div className='container'>
                    <div className='profileHd bold'>Submit a Request</div>
                    <SubmitRequestTab />
                </div>
            </div>
            <MarketplaceFooter />
        </div>
    )
}

export default SubmitRequest 