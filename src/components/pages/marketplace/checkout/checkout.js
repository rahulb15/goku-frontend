import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Button, FormGroup, Input, Label } from "reactstrap";
import CheckoutItem from "../../../../assets/checkout-item.png";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import "./checkout.scss";

const Checkout = () => {
  return (
    <div>
      {/* <MarketplaceHeader /> */}
      <HeaderafterLogin />
      <div className="midSectionBx">
        <div className="container">
          <div className="featCollectHd bold">
            <BsArrowLeft /> Checkout
          </div>
          <div className="contInfOuter">
            <div className="continf_Left">
              <h4>1. Contact Information</h4>
              <div className="contfrmBx">
                <div className="contfrmHalf">
                  <div className="checkoutfrmBx">
                    <FormGroup>
                      <Label for="exampleEmail">First Name</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder=""
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="contfrmHalf">
                  <div className="checkoutfrmBx">
                    <FormGroup>
                      <Label for="exampleEmail">Last Name</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder=""
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div className="contfrmBx">
                <div className="contfrmHalf">
                  <div className="checkoutfrmBx">
                    <FormGroup>
                      <Label for="exampleEmail">Phone</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder=""
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="contfrmHalf">
                  <div className="checkoutfrmBx">
                    <FormGroup>
                      <Label for="exampleEmail">E-Mail</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder=""
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <h4>2. Billing Address</h4>
              <div className="checkoutfrmBx">
                <FormGroup>
                  <Label for="exampleEmail">Address 1</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder=""
                  />
                </FormGroup>
              </div>
              <div className="checkoutfrmBx">
                <FormGroup>
                  <Label for="exampleEmail">Address 2</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder=""
                  />
                </FormGroup>
              </div>
              <div className="checkoutfrmBx">
                <FormGroup>
                  <Label for="exampleEmail">Country</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>USA</option>
                    <option>UK</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="contfrmBx">
                <div className="contfrmHalf">
                  <div className="checkoutfrmBx">
                    <FormGroup>
                      <Label for="exampleEmail">Postcode/ZIP</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder=""
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="contfrmHalf">
                  <div className="checkoutfrmBx">
                    <FormGroup>
                      <Label for="exampleEmail">Town/City</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder=""
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <h4>3. Shipping Address</h4>
              <div className="addresCheck">
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />
                    Shipping address same as billing address
                  </Label>
                </FormGroup>
              </div>
              <div className="checkoutfrmBx">
                <FormGroup>
                  <Label for="exampleEmail">Address 1</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder=""
                  />
                </FormGroup>
              </div>
              <div className="checkoutfrmBx">
                <FormGroup>
                  <Label for="exampleEmail">Address 2</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder=""
                  />
                </FormGroup>
              </div>
              <div className="checkoutfrmBx">
                <FormGroup>
                  <Label for="exampleEmail">Country</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>USA</option>
                    <option>UK</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="contfrmBx">
                <div className="contfrmHalf">
                  <div className="checkoutfrmBx">
                    <FormGroup>
                      <Label for="exampleEmail">Postcode/ZIP</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder=""
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="contfrmHalf">
                  <div className="checkoutfrmBx">
                    <FormGroup>
                      <Label for="exampleEmail">Town/City</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder=""
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
              <h4>3. Shipping Address</h4>
              <div className="addresCheck">
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />
                    $30 - Same day delivery
                  </Label>
                </FormGroup>
              </div>
              <div className="addresCheck">
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />
                    $20 - Next day delivery
                  </Label>
                </FormGroup>
              </div>
              <div className="addresCheck">
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />
                    $10 - Two day delivery
                  </Label>
                </FormGroup>
              </div>
              <div className="addresCheck">
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />
                    Free delivery
                  </Label>
                </FormGroup>
              </div>
            </div>
            <div className="continf_Right">
              <h3>Order Summary</h3>
              <div className="orderItem">
                <div className="orderImg">
                  <img src={CheckoutItem} alt="" />
                </div>
                <div className="orderName">
                  <small>NFT name here</small>
                  <strong>Merchandise Title</strong>
                </div>
                <div className="orderval">$25.59</div>
              </div>
              <div className="totlList">
                <ul>
                  <li className="bold">
                    <span>Subtotal</span>
                    <strong>$25.59</strong>
                  </li>
                  <li className="bold">
                    <span>Shipping</span>
                    <strong>$10.10</strong>
                  </li>
                  <li className="totalvalue bold">
                    <span>Total</span>
                    <strong>$35.59</strong>
                  </li>
                </ul>
              </div>
              <div className="paymentBtn">
                <Button>Next-Payment</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
};

export default Checkout;
