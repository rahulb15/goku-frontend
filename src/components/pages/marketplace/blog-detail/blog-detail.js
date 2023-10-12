import React from "react";
import BlogBanner from "../../../../assets/blog-banner.png";
import blogImg1 from "../../../../assets/blog-img1.png";
import blogImg2 from "../../../../assets/blog-img2.png";
import blogImg3 from "../../../../assets/blog-img3.png";
import blogerIcon from "../../../../assets/prodOwner2.png";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import "./blog-detail.scss";

const BlogDetail = () => {
  return (
    <div>
      {/* <MarketplaceHeader /> */}
      <HeaderafterLogin />
      <div className="midSectionBx">
        <div className="container">
          <div className="bloDetailBanner">
            <div className="blogbannerImg">
              <img src={BlogBanner} alt="" />
            </div>
            <div className="blogbannerCOntent">
              <h2>Check out Kadena — now in beta on Kryptomerch</h2>
              <div className="blogerName">
                <i>
                  <img src={blogerIcon} alt="" />
                </i>
                <strong>Kryptomerch</strong>
                <span>Aug 30, 2022 • 2 min read</span>
              </div>
              <p>
                Building from scratch is hard. Especially in Web3. Having done
                it multiple times, on multiple blockchains, we can attest that
                nothing is better than simple, straightforward solutions when it
                comes to building.
              </p>
              <p>
                So the simpler the process is, the easier it is to get people to
                build in Web3. The more people start building in Web3, the more
                adoption this space gets—you get the drill!
              </p>
              <p>
                That’s why protocols like Metaplex exist. Metaplex provides
                tools and standards for launching and creating NFT collections
                in the Solana ecosystem.
              </p>
              <p>
                Even if you haven’t heard of them before, you’ve probably heard
                of NFT projects they helped launch: Okay Bears, DeGods,
                Degenerate Ape Academy and more were made possible by Metaplex
                tooling. With over 15 million NFTs minted and over 100,000
                projects supported, it has grown to become the biggest provider
                of NFT tooling in the Solana ecosystem. In fact, nearly every
                NFT minted on Solana has been powered by Metaplex.
              </p>
              <p>
                We partnered with Metaplex to launch our Solana integration
                earlier this year, both on the Rarible protocol and Rarible.com
                marketplace level.
              </p>
              <p>
                We loved their product, so we wanted to tell you more about it
                and how you can enjoy the vast NFT ecosystem of Metaplex—either
                as an enthusiast who uses Rarible to create and trade NFTs, or
                someone looking to launch their own collection.
              </p>
              <p>
                Escrowless NFT Transactions with Auction House Metaplex is the
                digital asset standard on Solana. They make it simple to create
                NFTs by providing a common standard that creators, collectors
                and builders can all use effectively.
              </p>
              <p>
                One of the Metaplex Protocol’s on-chain tools we use at Rarible
                is called the Auction House. The program lets you list Solana
                NFTs without losing access to them.
              </p>
              <p>
                So instead of keeping your NFTs in a centralized escrow wallet
                during the listing, Auction House lets you hold full custody of
                your NFTs until they sell. The NFT(s) and funds are directly
                exchanged between you and the seller—meaning no middlemen and
                more control for both of you!
              </p>
              <p>
                It also means you get to enjoy the benefits of your NFTs until
                they sell. You’ll still be in the token-gated communities,
                receive airdrops and access any token-gated content until the
                moment your NFT sells. Additionally, using Auction House’s
                escrowless exchange lets you list on multiple marketplaces,
                which increases listing visibility! Much like other tools coming
                from Metaplex, the Auction House program is fully-audited and
                open-source.
              </p>
              <p>
                More tools for building communities and projects Of course,
                Metaplex is much more than its Auction House program. They offer
                a whole lot to builders and creators in the community,
                including:
              </p>
              <p>
                ● Developer tools: With standardized tooling such as SDKs and
                smart contracts, creating NFT collections, marketplaces and
                other dApps becomes easier.
              </p>
              <p>
                ● Community: If you want to reward your community with airdrops,
                token-gate your Discord or integrate with other social
                platforms, Metaplex streamlines the process with its free and
                open-source tools.
              </p>
              <p>
                ● Security: Stay safe from bots, impersonators and other bad
                actors.
              </p>
              <p>
                ● Mint directly: Turn your art into NFTs by minting 1:1s,
                editions or collections.
              </p>
              <p>
                We want to make sure you truly own your NFTs instead of creating
                risks by taking custody of your NFTs. We also want you to have
                more control over your assets, and the Auction House program
                ensures exactly that.
              </p>
              <p>
                We use also Metaplex infrastructure to keep the Degenerate Ape
                Academy marketplace, Rarible Protocol and Rarible’s Solana
                marketplace running smoothly. To keep up-to-date with Solana's
                largest NFT ecosystem, follow them on Twitter at @metaplex.
              </p>
            </div>
            <h2 className="similerBlogHd">Other Similar Posts</h2>
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
              </ul>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
};

export default BlogDetail;
