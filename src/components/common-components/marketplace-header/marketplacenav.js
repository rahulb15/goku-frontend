import React, { Component } from "react";
import { BsFillChatTextFill, BsInstagram, BsYoutube } from "react-icons/bs";
import {
  FaDiscord,
  FaFacebookF,
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { Button, Card, CardBody } from "reactstrap";

import ThemeButton from "./themebutton";

export default class MarketplaceNav extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        {/* <Button className='dotsToggle'><HiDotsHorizontal /></Button> */}

        <div className="marketplaceMenu">
          <Card>
            <CardBody>
              <ThemeButton />
              <Button className="closeBtn">x</Button>
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
        </div>
      </div>
    );
  }
}
