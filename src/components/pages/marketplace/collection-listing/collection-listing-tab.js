import classnames from "classnames";
import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import NftTabs1 from "./collectionTabs/nfttabs1";
import NftTabs2 from "./collectionTabs/nfttabs2";

//make function component
const CollectionListingTab = (props) => {
  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="listing_TabOuter">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
            style={{ cursor: "pointer" }}
          >
            Items
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
            style={{ cursor: "pointer" }}

          >
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
};

export default CollectionListingTab;
