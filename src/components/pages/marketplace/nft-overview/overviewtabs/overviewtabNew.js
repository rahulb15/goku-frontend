import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Form, FormGroup, Label, Input, FormText, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import OverviewTab1 from './overviewtab1'
import OverviewTab3 from './overviewtab3'
import OverviewTab4 from './overviewtab4'

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
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}>
              History
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <OverviewTab4 />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}