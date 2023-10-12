import React, { Component } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { HiCheckCircle } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import Background from "../../../../assets/creator-banner.png";
import CreatorImg from "../../../../assets/creator-img.png";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import "./collection-listing.scss";
import CollectionListingTab from "./login-collection-listing-tab";

export default function CommunityMarketplace() {

    return (
      <div>
        {/* <MarketplaceHeader /> */}
        <HeaderafterLogin />
        <div
          className="creatorOuterBx"
          style={{ background: `url(${Background})` }}
        >
          <div className="container">
            <div className="creatorDetBx">
              <div className="creatorImg">
                <img src={CreatorImg} alt="" />
              </div>
              <div className="creatorDet">
                <div className="creatorNameOuter">
                  <div className="creatorName">
                    KDA Punks <HiCheckCircle />
                  </div>
                  <div className="wishlist">
                    <button>
                      <AiOutlineStar />
                    </button>
                    <button>
                      <BsFillShareFill />
                    </button>
                  </div>
                </div>
                <div className="kryptoId">
                  <div className="kryptoInn">
                    0xbc4c...f13d&nbsp;
                    <MdOutlineContentCopy />
                  </div>
                  <div className="kryptocreator">
                    Created By
                    <strong>KDA Punk</strong>
                  </div>
                </div>
                <div className="kryptoCont">
                  The collection name here is a collection of 10,000 unique
                  Collection NFTs— unique digital collectibles living on the
                  Kadena blockchain. Your Collection doubles as your Collection
                  membership card, and grants access to...{" "}
                  <a href="">Show more</a>
                </div>
                <div className="items_qty">
                  <div className="itemQtyBx">
                    <small>Items</small>
                    <strong>491</strong>
                  </div>
                  <div className="itemQtyBx">
                    <small>Owners</small>
                    <strong>404</strong>
                  </div>
                  <div className="itemQtyBx">
                    <small>Total Volume</small>
                    <strong>K 2822.7</strong>
                  </div>
                  <div className="itemQtyBx">
                    <small>Floor Price</small>
                    <strong>K 4</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="creatortabOuter">
            <div className="container">
              <CollectionListingTab />
            </div>
          </div>
        </div>
        <MarketplaceFooter />
      </div>
    );
}
