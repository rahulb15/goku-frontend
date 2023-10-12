import React from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import RelprodIcon1 from "../../../../assets/rel-prod-icon1.png";
import RelprodIcon2 from "../../../../assets/rel-prod-icon2.png";

const Collectors = () => {
  return (
    <div>
      <div className="brandingLogoBx" id="slide4">
        <div className="stepBx">
          <i></i>
          <span>3</span>
        </div>
        <div className="mainHd">
          <h3 className="bold">Branding</h3>
          <h2 className="extrabold">
            For Collectors
            <small>Here are the details on what you can/can’t do:</small>
          </h2>
        </div>
        <div className="relprodOuter">
          <div className="relprod_Inn">
            <i>
              <img src={RelprodIcon1} alt="" />
            </i>
            <h2 className="bold">Please do:</h2>
            <ul>
              <li>
                <IoMdCheckmark /> Keep the community safe by reporting content
                which violates these guidelines.
              </li>
              <li>
                <IoMdCheckmark /> Collect and trade NFTs on Kryptomerch. By
                collecting, you own the NFT which links to the artwork on a
                blockchain.
              </li>
              <li>
                <IoMdCheckmark /> Show off your NFTs on platforms or virtual
                spaces.
              </li>
              <li>
                <IoMdCheckmark /> Respect copyright and intellectual property
                rights according to the creator’s license.
              </li>
            </ul>
          </div>
          <div className="relprod_Inn">
            <i>
              <img src={RelprodIcon2} alt="" />
            </i>
            <h2 className="bold">Please don't:</h2>
            <ul>
              <li className="notcool">
                <IoMdClose /> Change the artwork before displaying or exhibiting
                it.
              </li>
              <li className="notcool">
                <IoMdClose /> Display or use your NFTs to spread hate, violence
                or degrading messages.
              </li>
              <li className="notcool">
                <IoMdClose /> Buy or sell Kryptomerch accounts or violate our
                terms and conditions.
              </li>
              <li className="notcool">
                <IoMdClose /> Make false claims to Kryptomerch support or create
                multiple claims about the same issue.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collectors;
