//import React, { Component } from 'react'
import { Button } from "reactstrap";
//import BannerCountDown from './bannerCountdown'
//import { walletStatusUpdate } from '../connect-wallet-popup/connectWalletAction';
import Pdf from "../../../../assets/litepaper.pdf";
//import { Link } from "react-router-dom";

const Banner = () => {

  return (
    <div>
      <div className="bannerOuter" id="slide1">
        <div className="banner_container">
          <h2 className="extrabold">
            <span className="one">
              Merchandising
              <span className="onenew"></span>
            </span>
            <br />
            <span className="two twodark">
              NFT,
              <span className="twonew"></span>
            </span>
            <span className="three threedark">
              Gaming
              <span className="threenew"></span>
            </span>
          </h2>
          {/* <div className='countdownBx'>
                            <BannerCountDown />
                        </div> */}
          <p className="medium">
            Enter the ever-expanding world of Kryptomerch. Dive into our
            exciting Gaming metaverse. Explore, Buy &amp; Sell the most amazing
            NFTs on our truly decentralized NFT Marketplace &amp; Launchpad
            based on Marmalade Standards. Buy &amp; Sell a wide variety of
            NFT-based Merchandise. Launching soon on Kadena with ZERO gas fees.
            That's right !
          </p>
          <a href={Pdf} target="_blank">
            <Button className="litepaperBtn bold">Litepaper</Button>
          </a>
          <div class="hero_gradient-button-wrapper__bi4sF launchpadBtn">
            <div className="launchhover">
              <span
                aria-hidden="true"
                class="hero_button-bg__seSDp hero_bg-1__Idwnm"
              ></span>
              <span
                aria-hidden="true"
                class="hero_button-bg__seSDp hero_bg-2__OnKew"
              ></span>
              <span
                aria-hidden="true"
                class="hero_button-bg__seSDp hero_bg-3__Ik39k"
              ></span>
            </div>
            <a
              role="button"
              tabindex="0"
              href="/launchpad"
              type="submit"
              rel="noopener"
              data-testid="landing-page/hero/get-demo-cta"
              class="button_base__AOyi_ reset_reset__90FTf button_button__dmey4 reset_reset__90FTf hero_gradient-button__kkwJu button_large__FQLqa button_ghost__sBWMh"
              data-geist-button=""
              data-version="v1"
            >
              <span class="button_content__9hWh7">Launchpad</span>
            </a>
          </div>
          {/* <a href='/launchpad' className='launchpadBtn bold'>Launchpad</a> */}
          <strong>EXPLORE THE VERTICAL WAY</strong>
        </div>
      </div>
    </div>
  );
};

export default Banner;
