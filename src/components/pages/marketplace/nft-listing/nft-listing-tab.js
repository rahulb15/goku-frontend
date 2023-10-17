import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Form, FormGroup, Label, Input, FormText, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import NftTabs1 from './nftTabs/nfttabs1'
import CollectionTabs from './nftTabs/collectiontabs'

export default class HotCollectionsTab extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div className='listing_TabOuter'>
        <Nav tabs>
          <NavItem style={{ cursor: 'pointer' }}>
            <NavLink className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}>
              NFTs
            </NavLink>
          </NavItem>
          <NavItem style={{ cursor: 'pointer' }}>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}>
              Minting Live
            </NavLink>
          </NavItem>
          <NavItem style={{ cursor: 'pointer' }}>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}>
              Minting Coming Soon
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <NftTabs1 />
          </TabPane>
          <TabPane tabId="2">
            <CollectionTabs />
          </TabPane>
          <TabPane tabId="3">
            Coming Soon 3
          </TabPane>
        </TabContent>
      </div>
    );
  }
}