import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Form, FormGroup, Label, Input, FormText, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import OverviewTab1 from './overviewtab1'
import OverviewTab2 from './overviewtab2'
import OverviewTab3 from './overviewtab3'
import OverviewTab4 from './overviewtab4'
import { useState, useEffect } from 'react'

// export default class HotCollectionsTab extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       activeTab: '1'
//     };
//   }

//   toggle(tab) {
//     if (this.state.activeTab !== tab) {
//       this.setState({
//         activeTab: tab
//       });
//     }
//   }
//   render() {
//     return (
//       <div className='listing_TabOuter'>
//         <Nav tabs>
//           <NavItem>
//             <NavLink className={classnames({ active: this.state.activeTab === '1' })}
//               onClick={() => { this.toggle('1'); }}>
//               Overview
//             </NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink
//               className={classnames({ active: this.state.activeTab === '2' })}
//               onClick={() => { this.toggle('2'); }}>
//               Properties
//             </NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink
//               className={classnames({ active: this.state.activeTab === '3' })}
//               onClick={() => { this.toggle('3'); }}>
//               Bids
//             </NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink
//               className={classnames({ active: this.state.activeTab === '4' })}
//               onClick={() => { this.toggle('4'); }}>
//               History
//             </NavLink>
//           </NavItem>
//         </Nav>

//         <TabContent activeTab={this.state.activeTab}>
//           <TabPane tabId="1">
//             <OverviewTab1 />
//           </TabPane>
//           <TabPane tabId="2">
//             <OverviewTab2 />
//           </TabPane>
//           <TabPane tabId="3">
//             <OverviewTab3 />
//           </TabPane>
//           <TabPane tabId="4">
//             <OverviewTab4 />
//           </TabPane>
//         </TabContent>
//       </div>
//     );
//   }
// }

export default function HotCollectionsTab(props) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }
  return (
    <div className='listing_TabOuter'>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}>
            Overview
            </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}>
            Properties
            </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}>
            Bids
            </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}>
            History
            </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <OverviewTab1 />
        </TabPane>
        <TabPane tabId="2">
          <OverviewTab2 />
        </TabPane>
        <TabPane tabId="3">
          <OverviewTab3 />
        </TabPane>
        <TabPane tabId="4">
          <OverviewTab4 />
        </TabPane>
      </TabContent>
    </div>
  );
}
