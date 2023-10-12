import React from "react";
import CatelogImg1 from "../../../../assets/catelogImg.png";
import CatelogImg2 from "../../../../assets/catelogImg2.png";
import CatelogImg3 from "../../../../assets/catelogImg3.png";
import CatelogImg4 from "../../../../assets/catelogImg4.png";
import CatelogImg6 from "../../../../assets/catelogImg6.png";
import MerchandiseImg1 from "../../../../assets/merchandise-img1.png";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import "./create-merchandise.scss";

const CreateMerchandise = () => {
  return (
    <div>
      <HeaderafterLogin />
      <div className="midSectionBx">
        <div className="container">
          <h2 className="merchandiseHd">Create Merchandise For</h2>
          <div className="merchandiseList">
            <ul>
              <li>
                <input type="radio" name="radio" />
                <i></i>
                <img src={MerchandiseImg1} alt="" />
                <span>Men's Clothing</span>
              </li>
              <li>
                <input type="radio" name="radio" />
                <i></i>
                <img src={MerchandiseImg1} alt="" />
                <span>Women's Clothing</span>
              </li>
              <li>
                <input type="radio" name="radio" />
                <i></i>
                <img src={MerchandiseImg1} alt="" />
                <span>Kid's Clothing</span>
              </li>
              <li>
                <input type="radio" name="radio" />
                <i></i>
                <img src={MerchandiseImg1} alt="" />
                <span>Accessories</span>
              </li>
              <li>
                <input type="radio" name="radio" />
                <i></i>
                <img src={MerchandiseImg1} alt="" />
                <span>Home & Living</span>
              </li>
            </ul>
          </div>
          <h2 className="merchandiseHd">Catalog</h2>
          <div className="catlogList">
            <ul>
              <li>
                <input type="radio" name="catlog" />
                <i></i>
                <img src={CatelogImg1} alt="" />
                <span>T - Shirt</span>
              </li>
              <li>
                <input type="radio" name="catlog" />
                <i></i>
                <img src={CatelogImg2} alt="" />
                <span>Hoodies</span>
              </li>
              <li>
                <input type="radio" name="catlog" />
                <i></i>
                <img src={CatelogImg3} alt="" />
                <span>Sweatshirts</span>
              </li>
              <li>
                <input type="radio" name="catlog" />
                <i></i>
                <img src={CatelogImg4} alt="" />
                <span>Long Sleeves</span>
              </li>
              <li>
                <input type="radio" name="catlog" />
                <i></i>
                <img src={CatelogImg1} alt="" />
                <span>Tank Tops</span>
              </li>
              <li>
                <input type="radio" name="catlog" />
                <i></i>
                <img src={CatelogImg6} alt="" />
                <span>Sportswear</span>
              </li>
              <li>
                <input type="radio" name="catlog" />
                <i></i>
                <img src={CatelogImg2} alt="" />
                <span>Hoodies</span>
              </li>
              <li>
                <input type="radio" name="catlog" />
                <i></i>
                <img src={CatelogImg3} alt="" />
                <span>Sweatshirts</span>
              </li>
              <li>
                <input type="radio" name="catlog" />
                <i></i>
                <img src={CatelogImg4} alt="" />
                <span>Long Sleeves</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
};

export default CreateMerchandise;
