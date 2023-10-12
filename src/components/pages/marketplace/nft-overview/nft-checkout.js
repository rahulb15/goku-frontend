/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import { useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MasterVisa from "../../../../assets/master-visa.png";
//import { FaKickstarterK } from "react-icons/fa";

const NftCheckout = (props) => {
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  
  const { buttonLabel, className } = props;

  const [modal, setModal] = React.useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="modalOuterBx">
      <Button
        className="buynowBtn"
        style={{
          backgroundColor: nightModeStatus ? "#fff" : "#000",
          color: nightModeStatus ? "#000" : "#fff",
        }}
        onClick={toggle}
      >
        Buy Now For 21.58 KDA
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalBody>
          <div className="createColelctionOuter">
            <div className="checkoutHd bold">Checkout</div>
            <div className="checkoutContent">
              You are about to purchase a<br />
              <strong>NFT Name #5063</strong> from <strong>John Deo</strong>
            </div>
            <div className="checkoutName">
              <i>K</i>
              <strong>0x278FA...1111</strong>
              <small>Kadena</small>
              <span>Connected</span>
            </div>
            <div className="balanceList">
              <ul>
                <li>
                  <span>Balance</span>
                  <strong>0 KDA</strong>
                </li>
                <li>
                  <span>Service fee 1%</span>
                  <strong>0.6 KDA</strong>
                </li>
                <li>
                  <span>You will pay</span>
                  <strong>21.64 KDA</strong>
                </li>
              </ul>
            </div>
            <div className="addfountBtn">
              <button>
                Add funds with <img src={MasterVisa} alt="" />
              </button>
            </div>
            <div className="insufficientFund">Insufficient funds in KDA</div>
          </div>
        </ModalBody>
        <ModalFooter className="collectionFooter">
          <Button className="closeModal" onClick={toggle}>
            x
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default NftCheckout;
