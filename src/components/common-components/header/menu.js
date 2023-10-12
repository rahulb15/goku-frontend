import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarToggler
} from "reactstrap";
import { Popup } from "semantic-ui-react";
import ChainIcon from "./chainIcon";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      chainCss: { color: "orangered" },
      chainMessage: "This application will be live on Chain",
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  dateCheck() {
    const x = new Date();
    const y = new Date("2023-01-01");
    if (x >= y) {
      this.setState({
        chainCss: { color: "limegreen" },
        chainMessage: "This application is live on Chain",
      });
    }
  }

  componentDidMount() {
    this.dateCheck();
    // Changing the state after 2 sec
    // from the time when the component
    // is rendered
  }

  render() {
    return (
      <div>
        <Navbar expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/marketplace">Marketplace</Link>
                {/* <NavLink href="/marketplace">Marketplace</NavLink> */}
              </NavItem>
              <NavItem>
                {/* <Link to='/marketplace'>Marketplace</Link> */}
                {/* <Link to='/launchpad'>Launchpad</Link> */}
                <NavLink href="/launchpad">Launchpad</NavLink>
              </NavItem>
              <NavItem>
                <Link to="/#slide2">About Us</Link>
                {/* <NavLink href="/#slide2">About Us</NavLink> */}
              </NavItem>
              <NavItem>
                <Link to="/#slide3">Roadmap</Link>
                {/* <NavLink href="/#slide3">Roadmap</NavLink> */}
              </NavItem>

              <NavItem>
                <ChainIcon />
                <Popup
                  trigger={
                    <Link style={this.state.chainCss}>
                      {" "}
                      {process.env.REACT_APP_CHAIN_ID}
                    </Link>
                  }
                  position="top center"
                >
                  {this.state.chainMessage} {process.env.REACT_APP_CHAIN_ID}
                </Popup>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
