import React from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import RelprodIcon1 from "../../../../assets/rel-prod-icon1.png";
import RelprodIcon2 from "../../../../assets/rel-prod-icon2.png";

const RelatedProducts = () => {
  return (
    <div>
      <div className="brandingLogoBx" id="slide7">
        <div className="stepBx">
          <i></i>
          <span>6</span>
        </div>
        <div className="mainHd">
          <h3 className="bold">Branding</h3>
          <h2 className="extrabold">
            Branding Related Products &amp; Services
          </h2>
        </div>
        <div className="relprodOuter">
          <div className="relprod_Inn">
            <i>
              <img src={RelprodIcon1} alt="" />
            </i>
            <h2 className="bold">Cool with us:</h2>
            <ul>
              <li>
                <IoMdCheckmark /> You’re welcome to use our logo and all design
                elements associated with us in your own artwork. Feel free to
                recreate, remix and create derivatives as long as you give
                attribution.
              </li>
              <li>
                <IoMdCheckmark /> Want to sell your artwork? Feel free to buy
                and sell derivative art as long as you give attribution.
              </li>
            </ul>
          </div>
          <div className="relprod_Inn">
            <i>
              <img src={RelprodIcon2} alt="" />
            </i>
            <h2 className="bold">Not cool with us:</h2>
            <ul>
              <li className="notcool">
                <IoMdClose /> Using our logo for your business. Don’t use any
                Rarible branding as part of your brand. That includes your app,
                product, business, or domain name, app icon, logo, or product
                design.
              </li>
              <li className="notcool">
                <IoMdClose /> We love partnerships, but don’t use or remix our
                brand assets to imply relationships, partnerships, or other
                endorsements when that’s not the case (feel free to reach out
                for a real partnership though).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
