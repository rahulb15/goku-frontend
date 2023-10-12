import React, { Component } from 'react'
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import ProfileSettingTab from './profile-setting-tab'
import "./profile-setting.scss"

export default function ProfileSetting() {
    return (
        <div>
            {/* <MarketplaceHeader /> */}
            <HeaderafterLogin />
            <div className='midSectionBx'>
                <div className='container'>
                    <div className='profileHd bold'>Profile Settings</div>
                    <ProfileSettingTab />
                </div>
            </div>
            <MarketplaceFooter />
        </div>
    )
}