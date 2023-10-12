import classnames from "classnames";
import React from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import NftTabs1 from "./collectionTabs/nftTab3";
import NftTabs2 from "./collectionTabs/nftTab4login";

export default class CollectionListingTab extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  render() {
    return (
      <div className="listing_TabOuter">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Items
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Activity
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <NftTabs1 />
          </TabPane>
          <TabPane tabId="2">
            <NftTabs2 />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
