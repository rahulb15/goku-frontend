//import React, { Component } from 'react'
import { Button } from "reactstrap";
//import LaunchpadCountDown from './launchpad-countdown'
//import {fetchPriorityPass} from "../../launchpad-detail/launchpad-banner/getPriorityPass.action"
import { useDispatch } from "react-redux";

const LaunchpadBanner = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="launch_bannerOuter" id="slide1">
        <div className="container">
          <div className="Banner_cont">
            <div className="bannerCont_Left">
              <h2 className="extrabold">
                <span>Kryptomerch</span>
                <br /> is Live Now
              </h2>
              {/* <LaunchpadCountDown /> */}
              <a href="https://discord.com/invite/Zk7E4WKKSC" target="_blank">
                {" "}
                <div className="whitelistBtn" style={{ marginTop: "30px" }}>
                  <Button className="semibold">Join Whitelist</Button>
                </div>
              </a>
            </div>
            <div className="bannerCont_Right">
              <div className="launchpadDate">
                <ul>
                  <li>
                    <span>Mint Date</span>
                    <strong>January 14th, 2023</strong>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Total NFTS</span>
                    <strong>2,777</strong>
                  </li>
                  <li>
                    <span>Max Mint Allocation</span>
                    <strong>5 x (WL)</strong>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Price</span>
                    <strong>25/30 KDA</strong>
                  </li>
                  <li>
                    <span>Total Minted</span>
                    <strong>0</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tagline">EXPLORE THE VERTICAL WAY</div>
        </div>
      </div>
    </div>
  );
};

export default LaunchpadBanner;
