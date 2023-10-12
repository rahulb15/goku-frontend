import React, { Component } from "react";
import { Button, Col, Row } from "reactstrap";
import PactImgDark from "../../../../assets/pact-img-dark.png";
import PactImg from "../../../../assets/pact-img.png";

export default class Aboutpact extends Component {
  render() {
    return (
      <div>
        <div className="blockchain_outer" id="slide5">
          <div className="container">
            <div className="stepBx">
              <i></i>
              <span>4</span>
            </div>
            <div className="mainHd">
              <h3 className="bold">Blockchain</h3>
              <h2 className="extrabold">About Pact</h2>
            </div>
            <div className="pactContent">
              <Row>
                <Col sm="6">
                  <p>
                    A very different contract language Pact isn’t like other
                    smart contract protocols. Designed to be readable by
                    non-developers, Pact has been battle-tested in production
                    applications for over two years. It delivers the first
                    indexable, multi- chain NFT standard, delivering all the
                    benefits of ERC-1155 as well as fractional ownership.
                  </p>
                </Col>
                <Col sm="6">
                  <p>
                    Ahead of the curve Pact already contains all the features
                    that other platforms say they will eventually develop,
                    including full Formal Verification of code, error messaging,
                    contract upgradability, multi-sig, and support for
                    interoperability. Pact facilitates complex transactional
                    logic with an ideal combination of authorization and
                    workflow functionality.
                  </p>
                </Col>
              </Row>
            </div>
            <div className="visitBtns">
              <a href="https://kadena.io/" target="_blank">
                <Button className="visitBtn1">Visit Kadena.io</Button>
              </a>
              <a
                href="https://marmalade.art/"
                target="_blank"
                className="visitBtn2"
              >
                Visit Marmalade.art
              </a>
            </div>
            <div className="pactImg">
              <img className="lightImg" src={PactImg} alt="" />
              <img className="darkImg" src={PactImgDark} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
