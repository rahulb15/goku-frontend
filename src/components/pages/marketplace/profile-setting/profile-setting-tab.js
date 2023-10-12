import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Form, FormGroup, Label, Input, FormText, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ProfileSettingTabs1 from './profileTabs/profile-setting-tab1'
import ProfileSettingTabs2 from './profileTabs/profile-setting-tab2'
import ProfileSettingTabs3 from './profileTabs/profile-setting-tab3'
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileSettingTab() {
  const { nightModeStatus } = useSelector(
    (state) => state.nightModeStatus
  );
  const [activeTab, setActiveTab] = useState("1")

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  return (
    <div className='profileTab_Outer'>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === '1' })}
            style={{
              color: nightModeStatus ? activeTab === '1' ? '#fff' : '#000' : "",
              backgroundColor: nightModeStatus ? activeTab === '1' ? '#000' : '#fff' : "",
              border: nightModeStatus ? activeTab === '1' ? '1px solid #fff' : '1px solid #000' : "",
              borderRadius: nightModeStatus ? activeTab === '1' ? '5px' : '5px' : "",
              boxShadow: nightModeStatus ? activeTab === '1' ? '0px 0px 10px 0px #fff' : '0px 0px 10px 0px #000' : "",
            }}
            onClick={() => { toggle('1'); }}>
            Account
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            style={{
              color: nightModeStatus ? activeTab === '2' ? '#fff' : '#000' : "",
              backgroundColor: nightModeStatus ? activeTab === '2' ? '#000' : '#fff' : "",
              border: nightModeStatus ? activeTab === '2' ? '1px solid #fff' : '1px solid #000' : "",
              borderRadius: nightModeStatus ? activeTab === '2' ? '5px' : '5px' : "",
              boxShadow: nightModeStatus ? activeTab === '2' ? '0px 0px 10px 0px #fff' : '0px 0px 10px 0px #000' : "",
            }}
            onClick={() => { toggle('2'); }}>
            Wallets
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            style={{
              color: nightModeStatus ? activeTab === '3' ? '#fff' : '#000' : "",
              backgroundColor: nightModeStatus ? activeTab === '3' ? '#000' : '#fff' : "",
              border: nightModeStatus ? activeTab === '3' ? '1px solid #fff' : '1px solid #000' : "",
              borderRadius: nightModeStatus ? activeTab === '3' ? '5px' : '5px' : "",
              boxShadow: nightModeStatus ? activeTab === '3' ? '0px 0px 10px 0px #fff' : '0px 0px 10px 0px #000' : "",
            }}
            onClick={() => { toggle('3'); }}>
            Notifications
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ProfileSettingTabs1 nightModeStatus={nightModeStatus} />
        </TabPane>
        <TabPane tabId="2">
          <ProfileSettingTabs2 nightModeStatus={nightModeStatus} />
        </TabPane>
        <TabPane tabId="3">
          <ProfileSettingTabs3 nightModeStatus={nightModeStatus} />
        </TabPane>
      </TabContent>
    </div>
  );
}