import React, { Component } from "react";
// import MarketplaceHeader from '../../../../components/common-components/marketplace-header/marketplace-header'
import { RiDeleteBinFill } from "react-icons/ri";
import ProdImg from "../../../../assets/marchendies-img2.png";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import "./cart.scss";

export default class CommunityMarketplace extends Component {
  render() {
    return (
      <div>
        {/* <MarketplaceHeader /> */}
        <HeaderafterLogin />
        <div className="midSectionBx">
          <div className="container">
            <div className="featCollectHd bold">Cart</div>
            <div className="cartOuter">
              <div className="cartLeft">
                <table cellPadding="0" cellSpacing="0">
                  <tr>
                    <th>Item</th>
                    <th width="150">Quantity</th>
                    <th width="150">Total</th>
                    <th width="100">Remove</th>
                  </tr>
                  <tr>
                    <td>
                      <div className="cartList">
                        <i>
                          <img src={ProdImg} alt="" />
                        </i>
                        <span>NFT name here</span>
                        <strong>Merchandise Title</strong>
                      </div>
                    </td>
                    <td>01</td>
                    <td>$33.59</td>
                    <td>
                      <RiDeleteBinFill />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cartList">
                        <i>
                          <img src={ProdImg} alt="" />
                        </i>
                        <span>NFT name here</span>
                        <strong>Merchandise Title</strong>
                      </div>
                    </td>
                    <td>01</td>
                    <td>$33.59</td>
                    <td>
                      <RiDeleteBinFill />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cartList">
                        <i>
                          <img src={ProdImg} alt="" />
                        </i>
                        <span>NFT name here</span>
                        <strong>Merchandise Title</strong>
                      </div>
                    </td>
                    <td>01</td>
                    <td>$33.59</td>
                    <td>
                      <RiDeleteBinFill />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cartList">
                        <i>
                          <img src={ProdImg} alt="" />
                        </i>
                        <span>NFT name here</span>
                        <strong>Merchandise Title</strong>
                      </div>
                    </td>
                    <td>01</td>
                    <td>$33.59</td>
                    <td>
                      <RiDeleteBinFill />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cartList">
                        <i>
                          <img src={ProdImg} alt="" />
                        </i>
                        <span>NFT name here</span>
                        <strong>Merchandise Title</strong>
                      </div>
                    </td>
                    <td>01</td>
                    <td>$33.59</td>
                    <td>
                      <RiDeleteBinFill />
                    </td>
                  </tr>
                </table>
              </div>
              <div className="cartRight">
                <h4>Order Summary</h4>
                <div className="summeryList">
                  <ul className="bold">
                    <li>
                      <span>Total Items</span>
                      <strong>04</strong>
                    </li>
                    <li>
                      <span>Subtotal</span>
                      <strong>$25.59</strong>
                    </li>
                    <li>
                      <span>Shipping</span>
                      <strong>$10</strong>
                    </li>
                    <li>
                      <span>Total</span>
                      <strong>$144.36</strong>
                    </li>
                  </ul>
                </div>
                <div className="nextpayBtn">
                  <button>Next-Payment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MarketplaceFooter />
      </div>
    );
  }
}
