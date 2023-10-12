import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Form, FormGroup, Label, Input, FormText, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import NftTabs1 from './my-profile-tabs/nfttabs1'
import NftTabs2 from './my-profile-tabs/nfttabs2'
import NftTabs3 from './my-profile-tabs/nfttabs3'
import NftTabs4 from './my-profile-tabs/nfttabs4'
import NftTabs5 from './my-profile-tabs/nfttabs5'
import NftTabs6 from './my-profile-tabs/nfttabs6'
import NftTabs7 from './my-profile-tabs/nfttabs7'
import NftTabs8 from './my-profile-tabs/nfttabs8'
import { useNavigate } from "react-router-dom";
//import { getTabId } from '@mui/base';

const HotCollectionsTab = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1")
  useEffect(() => { getTab() }, [])
  const getTab = () => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    let foo = params.get('tab')
    
    if (foo === null) {
      setActiveTab("1")
      navigate("/marketplace/my-profile-owned?tab=Owned")
    }
    if (foo === "Owned") {
      setActiveTab("1")
    }
    if (foo === "On-sale") {
      setActiveTab("2")
    }
    if (foo === "Created") {
      setActiveTab("3")
    }
    if (foo === "Collections") {
      setActiveTab("4")
    }
    if (foo === "Favorited") {
      setActiveTab("5")
    }
    if (foo === "Activity") {
      setActiveTab("6")
    }
    if (foo === "Merchandise") {
      setActiveTab("7")
    }
  }

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      if (tab === "1") {
        navigate("/marketplace/my-profile-owned?tab=Owned")
      }
      if (tab === "2") {
        navigate("/marketplace/my-profile-owned?tab=On-sale")
      }
      if (tab === "3") {
        navigate("/marketplace/my-profile-owned?tab=Created")
      }
      if (tab === "4") {
        navigate("/marketplace/my-profile-owned?tab=Collections")
      }
      if (tab === "5") {
        navigate("/marketplace/my-profile-owned?tab=Favorited")
      }
      if (tab === "6") {
        navigate("/marketplace/my-profile-owned?tab=Activity")
      }
      if (tab === "7") {
        navigate("/marketplace/my-profile-owned?tab=Merchandise")
      }
      if (tab === "8") {
        navigate("/marketplace/my-profile-owned?tab=Launchpad")
      }
    }
  }

  return (
    <div className='listing_TabOuter'>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }} style={{ cursor: "pointer" }}>
            Owned
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }} style={{ cursor: "pointer" }}>
            On Sale
          </NavLink>
        </NavItem>
        {/* <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '3' })}
              onClick={() => { toggle('3'); }} style={{cursor:"pointer"}}>

              Created
            </NavLink>
          </NavItem> */}
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }} style={{ cursor: "pointer" }}>
            Created
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { toggle('5'); }} style={{ cursor: "pointer" }}>
            Favorited
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '6' })}
            onClick={() => { toggle('6'); }} style={{ cursor: "pointer" }}>
            Activity
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '7' })}
            onClick={() => { toggle('7'); }} style={{ cursor: "pointer" }}>
            Merchandise
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '8' })}
            onClick={() => { toggle('8'); }} style={{ cursor: "pointer" }}>
            Launchpad
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <NftTabs1 />
        </TabPane>
        <TabPane tabId="2">
          <NftTabs2 />
        </TabPane>
        <TabPane tabId="3">
          <NftTabs3 />
        </TabPane>
        <TabPane tabId="4">
          <NftTabs4 />
        </TabPane>
        <TabPane tabId="5">
          <NftTabs5 />
        </TabPane>
        <TabPane tabId="6">
          <NftTabs6 />
        </TabPane>
        <TabPane tabId="7">
          <NftTabs7 />
        </TabPane>
        <TabPane tabId="8">
          <NftTabs8 />
        </TabPane>
      </TabContent>
    </div>
  );
}

export default HotCollectionsTab