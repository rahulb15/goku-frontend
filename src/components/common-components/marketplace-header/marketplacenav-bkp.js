import React, { Component } from "react";
import { BsFillChatTextFill, BsInstagram, BsYoutube } from "react-icons/bs";
import {
  FaDiscord,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { Button, Card, CardBody, Collapse } from "reactstrap";

import ThemeButton from "./themebutton";

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
        <Button className="dotsToggle">
          <HiDotsHorizontal />
        </Button>
        <Collapse className="marketplaceMenu open">
          <Card>
            <CardBody>
              <ThemeButton />
              <div className="markMEnuList">
                <ul>
                  <li>
                    <a href="" className="bold">
                      Explore NFTs
                    </a>
                  </li>
                  <li>
                    <a href="" className="bold">
                      NFT Collections
                    </a>
                  </li>
                  <li>
                    <a href="" className="bold">
                      NFT Launchpad
                    </a>
                  </li>
                  <li>
                    <a href="" className="bold">
                      Explore Merchandise
                    </a>
                  </li>
                  <li>
                    <a href="" className="bold">
                      Create Merchandise
                    </a>
                  </li>
                  <li>
                    <a href="" className="bold">
                      Designer Collection
                    </a>
                  </li>
                  <li>
                    <a href="">FAQs</a>
                  </li>
                  <li>
                    <a href="">Blog</a>
                  </li>
                  <li>
                    <a href="">KDM Token</a>
                  </li>
                  <li>
                    <a href="">Accessories</a>
                  </li>
                  <li>
                    <a href="">API</a>
                  </li>
                  <li>
                    <a href="">Help Center</a>
                  </li>
                </ul>
              </div>
              <div className="markNavBot">
                <div className="marknavChat">
                  <button>
                    <BsFillChatTextFill /> Community Chat
                  </button>
                </div>
                <div className="mpSocial">
                  <a href="">
                    <FaFacebookF />
                  </a>
                  <a href="">
                    <FaTwitter />
                  </a>
                  <a href="">
                    <BsInstagram />
                  </a>
                  <a href="">
                    <BsYoutube />
                  </a>
                  <a href="">
                    <FaLinkedinIn />
                  </a>
                  <a href="">
                    <FaTelegramPlane />
                  </a>
                  <a href="">
                    <FaDiscord />
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Example;
