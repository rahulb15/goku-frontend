import React, { useState, useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Form, FormGroup, Label, Input, FormText, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ExpolreTabs1 from './expolre-tabs/expolretab1'
import { collectionCategory } from "../../../common-components/common_json/collection_category"
import { useNavigate } from "react-router-dom";


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
      navigate("/marketplace/explore-collections?tab=Art")
    }
    if (foo === "Art") {
      setActiveTab("1")
    }
    if (foo === "Collectibles") {
      setActiveTab("2")
    }
    if (foo === "Domain-names") {
      setActiveTab("3")
    }
    if (foo === "Music") {
      setActiveTab("4")
    }
    if (foo === "Photography") {
      setActiveTab("5")
    }
    if (foo === "Sports") {
      setActiveTab("6")
    }
    if (foo === "Trading-cards") {
      setActiveTab("7")
    }
    if (foo === "Utility") {
      setActiveTab("8")
    }
    if (foo === "Launchpad") {
      setActiveTab("9")
    }
    // if(foo==="PriorityPass"){
    // setActiveTab("10")
    // }
  }

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      if (tab === "1") {
        navigate("/marketplace/explore-collections?tab=Art")
      }
      if (tab === "2") {
        navigate("/marketplace/explore-collections?tab=Collectibles")
      }
      if (tab === "3") {
        navigate("/marketplace/explore-collections?tab=Domain-names")
      }
      if (tab === "4") {
        navigate("/marketplace/explore-collections?tab=Music")
      }
      if (tab === "5") {
        navigate("/marketplace/explore-collections?tab=Photography")
      }
      if (tab === "6") {
        navigate("/marketplace/explore-collections?tab=Sports")
      }
      if (tab === "7") {
        navigate("/marketplace/explore-collections?tab=Trading-cards")
      }
      if (tab === "8") {
        navigate("/marketplace/explore-collections?tab=Utility")
      }
      if (tab === "9") {
        navigate("/marketplace/explore-collections?tab=Launchpad")
      }
      // if(tab==="10"){
      //   navigate("/marketplace/explore-collections?tab=PriorityPass")
      // }
    }
  }

  return (
    <div className='listing_TabOuter'>
      <Nav tabs style={{ cursor: "pointer" }}>
        {collectionCategory.map((data) => {
          return <NavItem>
            <NavLink className={classnames({ active: activeTab === data.id })}
              onClick={() => { toggle(data.id); }}>
              {data.collectionName}
            </NavLink>

          </NavItem>
        })}


      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ExpolreTabs1 tabno={0} />
        </TabPane>
        <TabPane tabId="2">
          <ExpolreTabs1 tabno={1} />
        </TabPane>
        <TabPane tabId="3">
          <ExpolreTabs1 tabno={2} />
        </TabPane>
        <TabPane tabId="4">
          <ExpolreTabs1 tabno={3} />
        </TabPane>
        <TabPane tabId="5">
          <ExpolreTabs1 tabno={4} />
        </TabPane>
        <TabPane tabId="6">
          <ExpolreTabs1 tabno={5} />
        </TabPane>
        <TabPane tabId="7">
          <ExpolreTabs1 tabno={6} />
        </TabPane>
        <TabPane tabId="8">
          <ExpolreTabs1 tabno={7} />
        </TabPane>
        <TabPane tabId="9">
          <ExpolreTabs1 tabno={8} />
        </TabPane>
        {/* <TabPane tabId="10">
            <ExpolreTabs1 tabno={9}/>
          </TabPane> */}
      </TabContent>
    </div>
  );

}

export default HotCollectionsTab