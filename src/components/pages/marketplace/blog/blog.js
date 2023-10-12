import React from "react";
import { Button } from "reactstrap";
import BlogBanner from "../../../../assets/blog-banner.png";
import blogImg1 from "../../../../assets/blog-img1.png";
import blogImg2 from "../../../../assets/blog-img2.png";
import blogImg3 from "../../../../assets/blog-img3.png";
import blogerIcon from "../../../../assets/prodOwner2.png";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import "./blog.scss";

const Blog = () => {
  return (
    <div>
      {/* <MarketplaceHeader /> */}
      <HeaderafterLogin />
      <div className="midSectionBx">
        <div className="container">
          <div className="bloBanner">
            <div className="blogbannerImg">
              <img src={BlogBanner} alt="" />
            </div>
            <div className="blogbannerCOntent">
              <div className="blogerName">
                <i>
                  <img src={blogerIcon} alt="" />
                </i>
                <strong>Kryptomerch</strong>
                <span>Aug 30, 2022 • 2 min read</span>
              </div>
              <h2>Check out Kadena — now in beta on Kryptomerch</h2>
              <p>
                Over the past year, Solana has emerged as one of the fastest
                growing NFT ecosystems in the world, and is among the most
                requested chains by the Kryptomerch community. We believe the
                future of web3 is multi-chain, and we’re excited to welcome
                Solana to OpenSea – starting today, with our beta!
              </p>
              <Button>Read More</Button>
            </div>
          </div>
          <div className="blogList">
            <ul>
              <li>
                <div className="blogImg">
                  <img src={blogImg1} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
              <li>
                <div className="blogImg">
                  <img src={blogImg2} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
              <li>
                <div className="blogImg">
                  <img src={blogImg3} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
              <li>
                <div className="blogImg">
                  <img src={blogImg1} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
              <li>
                <div className="blogImg">
                  <img src={blogImg2} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
              <li>
                <div className="blogImg">
                  <img src={blogImg3} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
              <li>
                <div className="blogImg">
                  <img src={blogImg1} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
              <li>
                <div className="blogImg">
                  <img src={blogImg2} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
              <li>
                <div className="blogImg">
                  <img src={blogImg3} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
              <li>
                <div className="blogImg">
                  <img src={blogImg1} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
              <li>
                <div className="blogImg">
                  <img src={blogImg2} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
              <li>
                <div className="blogImg">
                  <img src={blogImg3} alt="" />
                </div>
                <h3>Introducing “gm mfer,” IRL coffee for NFT mfers</h3>
                <p>
                  GM. Here's your coffee. Inspired by the mfer community,
                  powered by CC0, roasted in Michigan.
                </p>
                <div className="blogName">
                  <i>
                    <img src={blogerIcon} alt="" />
                  </i>
                  <strong>Kryptomerch</strong>
                  <span>Aug 30, 2022 • 2 min read</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
};
export default Blog;
