import classnames from "classnames";
import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import SubmitRequestTabs1 from "./submitrequestab/submit-request-tab1";
import SubmitRequestTabs2 from "./submitrequestab/submit-request-tab2";
import SubmitRequestTabs3 from "./submitrequestab/submit-request-tab3";

export default class SubmitRequestTab extends React.Component {
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
      <div className="profileTab_Outer">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              My Account
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Wallet and Transaction Issues
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Buying and Selling NFTs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Developer Help
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "5" })}
              onClick={() => {
                this.toggle("5");
              }}
            >
              Report a Bug or Error Message
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "6" })}
              onClick={() => {
                this.toggle("6");
              }}
            >
              Report Fraudulent Activity
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <SubmitRequestTabs1 />
          </TabPane>
          <TabPane tabId="2">
            <SubmitRequestTabs2 />
          </TabPane>
          <TabPane tabId="3">
            <SubmitRequestTabs3 />
          </TabPane>
          <TabPane tabId="4">
            <SubmitRequestTabs3 />
          </TabPane>
          <TabPane tabId="5">
            <SubmitRequestTabs3 />
          </TabPane>
          <TabPane tabId="6">
            <SubmitRequestTabs3 />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
