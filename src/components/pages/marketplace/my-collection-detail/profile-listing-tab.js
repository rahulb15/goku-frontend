import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Form, FormGroup, Label, Input, FormText, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import NftTabs1 from './my-profile-tabs/nfttabs1'
import NftTabs2 from './my-profile-tabs/nfttabs2'

//make function component
const CollectionListingTab = (props) => {
  
  const [activeTab, setActiveTab] = React.useState("1")

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  return (
    <div className='listing_TabOuter'>
      <Nav tabs>
        <NavItem>
          <NavLink className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}>
            Items
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}>
            Collections
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <NftTabs1 {...props} />
        </TabPane>
        <TabPane tabId="2">
          <NftTabs2 {...props} />
        </TabPane>
      </TabContent>
    </div>
  );
}

export default CollectionListingTab;







// export default class CollectionListingTab extends React.Component {
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
//               Items
//             </NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink
//               className={classnames({ active: this.state.activeTab === '2' })}
//               onClick={() => { this.toggle('2'); }}>
//               Activity
//             </NavLink>
//           </NavItem>
//         </Nav>
//         <TabContent activeTab={this.state.activeTab}>
//           <TabPane tabId="1">
//             <NftTabs1 />
//           </TabPane>
//           <TabPane tabId="2">
//             <NftTabs2 />
//           </TabPane>
//         </TabContent>
//       </div>
//     );
//   }
// }