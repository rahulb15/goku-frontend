import React from "react";
import { BsInstagram, BsTelegram } from "react-icons/bs";
import { FaDiscord, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, FormGroup, Input } from "reactstrap";
import NewsletterHelper from "../newsletter/newsletter";

import "./marketplace-footer.scss";

export const MarketplaceFooter = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="footerTop">
            <div className="foottopLeft">
              <h3>Subscribe</h3>
              <span>
                Get informed &amp; updated with kryptomerch newsletter.
              </span>
              <div className="subsBx">
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Your Email Address"
                  />
                </FormGroup>
                <Button color="primary bold" onClick={NewsletterHelper}>
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="foottopRight">
              <h3>Join Community</h3>
              <a
                href="https://www.facebook.com/people/kryptomerchio/100082978494721/"
                target="_blank"
              >
                <FaFacebook />
              </a>
              <a href="https://twitter.com/KRYPTOMERCH_IO" target="_blank">
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/KRYPTOMERCH.IO/"
                target="_blank"
              >
                <BsInstagram />
              </a>
              <a
                href="https://www.youtube.com/channel/UC0QtNdjg9OIXIqSrAY52Wmw/"
                target="_blank"
              >
                <FaYoutube />
              </a>
              <a href="https://t.me/KRYPTOMERCHIO" target="_blank">
                <BsTelegram />
              </a>
              <a href="https://discord.com/invite/Zk7E4WKKSC" target="_blank">
                <FaDiscord />
              </a>
            </div>
          </div>
          <div className="footerNavOuter">
            <div className="footDisc">
              <strong>Kryptomerch</strong>
              <p>
                Introducing Kryptomerch.io, the revolutionary NFT launchpad
                marketplace and merchandising protocol that's taking the crypto
                world by storm. Kryptomerch is your gateway to the world's first
                NFT-based merchandising store and marketplace, offering a wide
                range of high-quality products with lightning-fast shipping. As
                a user, you can not only buy but also sell your NFT-based
                merchandising on our platform, providing more utility and value
                to your digital assets. Join the NFT revolution and unleash your
                creativity with Kryptomerch.io.
              </p>
            </div>
            <div className="footNav">
              <strong>NFTs Marketplace</strong>
              <ul>
                <li>
                  <Link to="/marketplace/nft-listing">All NFTs</Link>
                </li>
                {/* <li><a href=''>Solana NFTs</a></li> */}
                {/* <li><a href=''>Art</a></li> */}
                <li>
                  <Link to="/marketplace/explore-collections?tab=Art">Art</Link>
                </li>
                <li>
                  <Link to="/marketplace/explore-collections?tab=Collectibles">
                    Collectibles
                  </Link>
                </li>
                {/* <li><a href=''>Music</a></li> */}
                <li>
                  <Link to="/marketplace/explore-collections?tab=Music">
                    Music
                  </Link>
                </li>
                <li>
                  <Link to="/marketplace/explore-collections?tab=Photography">
                    Photography
                  </Link>
                </li>
                <li>
                  <Link to="/marketplace/explore-collections?tab=Sports">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link to="/marketplace/explore-collections?tab=Trading-cards">
                    Trading Cards
                  </Link>
                </li>
                <li>
                  <Link to="/marketplace/explore-collections?tab=Launchpad">
                    Launchpad
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footNav">
              <strong>Merchandise</strong>
              <ul>
                <li>
                  <Link to="/marketplace/explore-merchandise">Explore</Link>
                </li>
                <li>
                  <Link to="/marketplace/create-merchandise">
                    Create Merchandise
                  </Link>
                </li>
                <li>
                  <Link to="/marketplace/accessories">Accessories</Link>
                </li>
                {/* <li><a href=''>Artwork</a></li> */}
              </ul>
            </div>
            <div className="footNav">
              <strong>Resources</strong>
              <ul>
                <li>
                  <Link to="/marketplace/help-center">Help Center</Link>
                </li>
                <li>
                  <Link to="/marketplace/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/how-it-works">How It Works</Link>
                </li>
                <li>
                  <Link to="/guidelines">Guidelines</Link>
                </li>
                {/* <li><a href=''>Staking</a></li> */}
              </ul>
            </div>
            <div className="footNav">
              <strong>Company</strong>
              <ul>
                <li>
                  <Link to="/branding">Branding</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/bug-bounty">Bug Bounty</Link>
                </li>
                <li>
                  <Link to="/kdm-token">KDM Token</Link>
                </li>
                {/* <li><a href=''>Game</a></li> */}
                <li>
                  <Link to="/launchpad">Launchpad</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footerBot">
            <div className="footBotLeft medium">
              &copy; 2023 Copyright Kryptomerch. All Rights Reserved.
            </div>
            <div className="footBotRight medium">
              <Link to="/contact">Contact</Link>
              <a href="/faq">FAQ</a>
              <a href="/intellectual-property-policy">
                Intellectual Property Policy
              </a>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-service">Terms of Services</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
