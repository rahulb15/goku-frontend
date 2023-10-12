import React from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import RelprodIcon1 from "../../../../assets/rel-prod-icon1.png";
import RelprodIcon2 from "../../../../assets/rel-prod-icon2.png";

const Creators = () => {
  return (
    <div>
      <div className="brandingLogoBx" id="slide3">
        <div className="stepBx">
          <i></i>
          <span>2</span>
        </div>
        <div className="mainHd">
          <h3 className="bold">Branding</h3>
          <h2 className="extrabold">
            For Creators
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
                <IoMdCheckmark /> Mint and sell NFTs on Kryptomerch. You
                maintain all legal rights, including copyrights and trademarks
                of your work.
              </li>
              <li>
                <IoMdCheckmark /> Share your work, exhibit it, create
                derivatives. Your art, your creative freedom!
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
                <IoMdClose /> Mint anyone else’s work as NFTs (unless you’ve got
                permission).{" "}
              </li>
              <li className="notcool">
                <IoMdClose /> Create NFTs which endorse violence, hate groups,
                terrorism, crime or other harmful content.
              </li>
              <li className="notcool">
                <IoMdClose /> Create NFTs which threaten individuals or groups.
                Hate speech, blackmail and harassment are banned.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creators;
