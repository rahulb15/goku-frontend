import React, { Component } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { Collapse, Button, CardBody, Card } from "reactstrap";

class Example extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div>
        <Button className="disconnectBtn" color="primary" onClick={this.toggle}>
          <FaWallet /> 0x278FA...{" "}
          <i>
            <MdKeyboardArrowDown />
          </i>
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <Button>Disconnect</Button>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Example;
