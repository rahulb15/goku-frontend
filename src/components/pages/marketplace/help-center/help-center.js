import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from "reactstrap";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import {
  FaSearch,
  FaWallet,
  FaTags,
  FaDiscourse,
  FaTshirt,
  FaHandshake,
  FaNotesMedical,
} from "react-icons/fa";
import { TbApps } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./help-center.scss";
import { useSelector } from "react-redux";

const HelpCenter = () => {
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);

  return (
    <div>
      {/* <MarketplaceHeader /> */}
      <HeaderafterLogin />
      <div className="midSectionBx">
        <div className="container">
          <div className="helpcenterHd extrabold">
            <span>Help</span> Center
          </div>
          <div className="helpSrchBx">
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="Search for help"
              />
            </FormGroup>
            <Button>
              <FaSearch />
            </Button>
          </div>
          <div className="helpcenterList">
            <ul>
              <li>
                <Link to="/">
                  <i>
                    <TbApps />
                  </i>
                  <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    Getting Started
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i>
                    <FaWallet />
                  </i>
                  <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    Buying
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i>
                    <FaTags />
                  </i>
                  <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    Selling
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i>
                    <FaTshirt />
                  </i>
                  <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    Merchandise
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i>
                    <FaDiscourse />
                  </i>
                  <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    FAQ's
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i>
                    <TbApps />
                  </i>
                  <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    Creating
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i>
                    <FaHandshake />
                  </i>
                  <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    Partners
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <i>
                    <FaNotesMedical />
                  </i>
                  <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    Developers
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="pramotedartHd bold">Promoted Articles</div>
          <div className="pramotedList">
            <ul>
              <li>
                <Link to="/">
                  <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    What is a wallet?
                  </span>
                </Link>
              </li>
              <li>
              <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                <Link to="/">
                <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    Navigating Kryptomerch
                    </span>
                    </Link>
                </span>
              </li>
              <li>
                <Link to="/">
                <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                  Setting up your account & Life hacks with NFTs!
                    </span>
                </Link>
              </li>
              <li>
                <Link to="/">
                <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    How do I report an NFT, user, or collection?
                    </span>
                    </Link>
              </li>
              <li>
                <Link to="/">
                <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    Common Problems & Solutions
                    </span>
                    </Link>
              </li>
              <li>
                <Link to="/">
                <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    Duplicate NFTs
                    </span>
                    </Link>
              </li>
              <li>
                <Link to="/">
                <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                  How do I re-apply for verification after denial?
                    </span>
                </Link>
              </li>
              <li>
                <Link to="/">
                <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    I should have recieved KDA, but I did not.
                    </span>
                    </Link>
              </li>
              <li>
                <Link to="/">
                <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                    Where is my minted NFT?
                    </span>
                    </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
};

export default HelpCenter;
