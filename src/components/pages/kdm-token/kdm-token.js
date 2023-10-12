//import React, { Component } from 'react'
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { MarketplaceFooter } from "../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import "./kdm-token.scss";

const BugBounty = () => {
  return (
    <div>
      {/* <MarketplaceHeader /> */}
      <HeaderafterLogin />
      <div className="midSectionBx">
        <div className="container">
          <div className="kdmOuter">
            <div className="kdmIconBx">K</div>
            <div className="kdmHd extrabold">
              Meet <span>KDM – Kryptomerch</span> Protocol DAO Governance Token
            </div>
            <div className="kdmCont">
              <p>
                Kryptomerch DAO is constantly evolving, and so is its governance
                token KDM! Starting from January 16, 2023, weekly KDM
                distribution for trading NFTs on the Kryptomerch.io marketplace
                will end as voted unanimously by the Rarible Kryptomerch
                community.
              </p>
              <p>
                By doing so, the DAO is shifting focus to allocating more funds
                to next-gen web3 projects building on Kryptomerch Protocol and
                the long term growth of the space. You can learn more about what
                this decision means for the DAO ecosystem here.
              </p>
            </div>
            <div className="kdmtokenBx">
              <div className="kdmtoken1">
                <span>Your balance</span>
                <strong>0 KDM</strong>
              </div>
              <div className="kdmtoken1">
                <span>Available for claim</span>
                <strong>0 KDM</strong>
              </div>
              <div className="nothingclaim">
                <button className="noclaimBtn">Nothing to claim</button>
                <button className="claimQues">?</button>
              </div>
            </div>
            <div className="kdmCont">
              <p>
                Please note that if you have any unclaimed KDM from trading on
                kryptomerch.com before the proposal was set in motion, you can
                still claim your rewards at your convenience on this page.
                There’s no deadline for this so you can make sure you're
                comfortable with the gas price before claiming—no rush!
                <br />
                Make sure to join kryptomerch DAO Discord to stay tuned for all
                things KDM.
              </p>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
};

export default BugBounty;
