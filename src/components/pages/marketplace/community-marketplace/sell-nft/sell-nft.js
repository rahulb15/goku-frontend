import React from "react";
import { FaTags, FaWallet } from "react-icons/fa";
import { MdDashboardCustomize, MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";

export const SellNft = () => {
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  return (
    <div>
      <div className="marketplaceAbout">
        <div className="container">
          <div
            className={
              nightModeStatus ? "market_mainHd" : "market_mainHd_Night"
            }
          >
            <h2 className="extrabold">
              {" "}
              <span className="extrabold">Create And Sell Your NFT</span>
            </h2>
          </div>
          <div className="sellNftBx">
            <ul>
              <li>
                <i>
                  <FaWallet />
                </i>
                <strong className="medium">Set up your wallet</strong>
                <p>
                  Once you've set up your wallet of choice, connect it to
                  Kryptomerch by clicking the connect button in the top right
                  corner. Learn about the wallets we support.
                </p>
              </li>
              <li>
                <i>
                  <MdDashboardCustomize />
                </i>
                <strong className="medium">Create your collection</strong>
                <p>
                  Click My Collections and set up your collection. Add social
                  links, a description, profile & banner images, and set a
                  secondary sales fee.
                </p>
              </li>
              <li>
                <i>
                  <MdEmail />
                </i>
                <strong className="medium">Add your NFTs</strong>
                <p>
                  Upload your work (image, video, audio, or 3D art), add a title
                  and description, and customize your NFTs with properties,
                  stats, and unlockable content.
                </p>
              </li>
              <li>
                <i>
                  <FaTags />
                </i>
                <strong className="medium">List them for sale</strong>
                <p>
                  Choose between auctions, fixed-price listings, and
                  declining-price listings. You choose how you want to sell your
                  NFTs, and we help you sell them!
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
