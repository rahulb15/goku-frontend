import React, { Component } from "react";
import { Col, Row } from "reactstrap";
//import { AiTwotoneShop } from "react-icons/ai";
import { CgBrowser } from "react-icons/cg";
import { FaBolt, FaCrown, FaDatabase, FaStore } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { TbReceipt } from "react-icons/tb";

export default class Blockchain extends Component {
  render() {
    return (
      <div>
        <div className="blockchain_outer" id="slide4">
          <div className="container">
            <div className="stepBx_blockchain">
              <i></i>
              <span>3</span>
            </div>
            <div className="mainHd_blockchain">
              <h3 className="bold">Blockchain</h3>
              <h2 className="extrabold">
                Why <span>Kadena</span>
              </h2>
            </div>
            <div className="blockchain_Content">
              <div className="block_contBx">
                <p>
                  We are early supporters of Kadena. A Layer 1 truly
                  decentralized Proof of work blockchain that is infinitely
                  scalable, environmentally friendly, and is home to the most
                  secure programming language the web has yet to see.
                </p>
              </div>
              <div className="block_contBx">
                <p>
                  We are here to build awesome utilities that fundamentally make
                  people want to use Kadena. We see so much potential in this
                  space and are eager to grow with Kadena as we transform
                  alongside this wonderful chain and manifest it can be.
                </p>
              </div>
            </div>
            <div className="blockchainList">
              <Row>
                <Col sm="6" className="blklist">
                  <h3 className="bold">
                    <i>
                      <FaStore />
                    </i>
                    Marketplace Standards
                  </h3>
                  <p>
                    NFT standards in Ethereum cannot enforce marketplace
                    requirements like royalties. Only Marmalade offers genuine
                    on-chain NFT sales, priced in any token, that are enforced
                    no matter what exchange they're offered on.
                  </p>
                </Col>
                <Col sm="6" className="blklist">
                  <h3 className="bold">
                    <i>
                      <CgBrowser />
                    </i>
                    Uniqueness Enforcement
                  </h3>
                  <p>
                    Like so many things in Marmalade, one feature powers
                    another. Rich Merkle-verified manifests and on-chain
                    artifacts create NFT hash-based addresses that are unique,
                    self-verifying, and make it impossible to mint a duplicate
                    item.
                  </p>
                </Col>
                <Col sm="6" className="blklist">
                  <h3 className="bold">
                    <i>
                      <IoDocumentTextSharp />
                    </i>
                    Haber Content Integrity (HCI)
                  </h3>
                  <p>
                    As invented by blockchain co-inventor Dr. Stuart Haber,
                    Marmalade NFTs mint on-chain with rich manifests, capturing
                    all references and artifacts in Merkle trees that identify
                    items as well as their complete version history.
                  </p>
                </Col>
                <Col sm="6" className="blklist">
                  <h3 className="bold">
                    <i>
                      <FaDatabase />
                    </i>
                    Artifact Storage
                  </h3>
                  <p>
                    Kadena continually scales to higher TPS (Transactions per
                    Second) as more chains are added to its network. More chain
                    means more low-cost storage and data provisioning, enabling
                    entire NFTs – including their rich metadata and contracts –
                    to be minted on-chain.
                  </p>
                </Col>
                <Col sm="6" className="blklist">
                  <h3 className="bold">
                    <i>
                      <FaBolt />
                    </i>
                    Resilience With Energy Efficiency
                  </h3>
                  <p>
                    Proof-of-Work (PoW) provides superior security as compared
                    to other protocols. Kadena’s innovative multi-chain
                    architecture runs on PoW to deliver speed, scale, and energy
                    efficiency previously thought unachievable. So the higher
                    the TPS (Transactions per Second) on the platform, the more
                    energy efficient it becomes.
                  </p>
                </Col>
                <Col sm="6" className="blklist">
                  <h3 className="bold">
                    <i>
                      <TbReceipt />
                    </i>
                    No Cost Transactions
                  </h3>
                  <p>
                    We leverage Kadena’s pioneering Crypto Gas Stations to allow
                    sellers to eliminate all transaction fees for their
                    customers, thus removing a key barrier to mass participation
                    in the NFT market.
                  </p>
                </Col>
                <Col sm="6" className="blklist">
                  <h3 className="bold">
                    <i>
                      <FaCrown />
                    </i>
                    Superior Custody
                  </h3>
                  <p>
                    Safety isn't just about valuation; it's also about reliable
                    chain-of-custody. When ownership is hard to steal, long-term
                    NFT value grows. Marmalade ledgers use Pact’s multi-sig
                    support (where multiple keys are required to authorize
                    transactions) to unlock programmable, fractional ownership.
                    This means innovative, multi-owner structures can be
                    programmed directly on chain with each owner receiving a key
                    to manage only their own rights for any given item.
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
