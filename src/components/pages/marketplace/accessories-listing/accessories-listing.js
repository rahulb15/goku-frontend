import React, { Component } from "react";
import { BsGridFill, BsSearch } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";
import { RiGridFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Button, FormGroup, Input } from "reactstrap";
import MrchendImg1 from "../../../../assets/mask-img1.png";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import "./accessories-listing.scss";
import AccessoriesSideBar from "./accessories_sidebar";

export default class AccessoriesListing extends Component {
  render() {
    return (
      <div>
        {/* <MarketplaceHeader /> */}
        <HeaderafterLogin />
        <div className="midSectionBx">
          <div className="container">
            <div className="filterBx">
              <div className="FltrLeft">
                <div className="fltrBtnBx">
                  <Button className="filterBtn">
                    <MdArrowBackIos /> Filter
                  </Button>
                </div>
              </div>
              <div className="FltrRight">
                <div className="fltrRgtInn">
                  <div className="fltrRgtInn_Left">
                    <div className="iftSrch">
                      <FormGroup>
                        <Input
                          type="email"
                          name="email"
                          id="exampleEmail"
                          placeholder="Search accessories"
                        />
                      </FormGroup>
                      <button>
                        <BsSearch />
                      </button>
                    </div>
                  </div>
                  <div className="fltrRgtInn_Right">
                    <div className="trendingBtn">
                      <FormGroup>
                        <Input
                          type="select"
                          name="select"
                          placeholder="Trending"
                          id="exampleSelect"
                        >
                          <option>Price low to high</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="gridBtnBx">
                      <Button className="gridBtn">
                        <BsGridFill />
                      </Button>
                      <Button className="gridListBtn">
                        <RiGridFill />
                      </Button>
                    </div>
                    <div className="refreshBtnBx">
                      <Button>
                        <TbRefresh />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="maskbreatcrum">
              <Link to="/">Accessories</Link> / Face Masks
            </div>
            <div className="maskHd extrabold">Face Masks</div>
            <div className="nftProdListOuter">
              <div className="nftFlt_Left">
                <AccessoriesSideBar />
              </div>
              <div className="nftFlt_Right">
                <div className="nftList">
                  <ul>
                    <li>
                      <Link to="/">
                        <div className="designCollection">
                          <i>
                            <img src={MrchendImg1} alt="" />
                          </i>
                          <span>Merchandise Title</span>
                          <small>$25.69</small>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div className="designCollection">
                          <i>
                            <img src={MrchendImg1} alt="" />
                          </i>
                          <span>Merchandise Title</span>
                          <small>$25.69</small>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div className="designCollection">
                          <i>
                            <img src={MrchendImg1} alt="" />
                          </i>
                          <span>Merchandise Title</span>
                          <small>$25.69</small>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div className="designCollection">
                          <i>
                            <img src={MrchendImg1} alt="" />
                          </i>
                          <span>Merchandise Title</span>
                          <small>$25.69</small>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div className="designCollection">
                          <i>
                            <img src={MrchendImg1} alt="" />
                          </i>
                          <span>Merchandise Title</span>
                          <small>$25.69</small>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div className="designCollection">
                          <i>
                            <img src={MrchendImg1} alt="" />
                          </i>
                          <span>Merchandise Title</span>
                          <small>$25.69</small>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div className="designCollection">
                          <i>
                            <img src={MrchendImg1} alt="" />
                          </i>
                          <span>Merchandise Title</span>
                          <small>$25.69</small>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div className="designCollection">
                          <i>
                            <img src={MrchendImg1} alt="" />
                          </i>
                          <span>Merchandise Title</span>
                          <small>$25.69</small>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div className="designCollection">
                          <i>
                            <img src={MrchendImg1} alt="" />
                          </i>
                          <span>Merchandise Title</span>
                          <small>$25.69</small>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <div className="designCollection">
                          <i>
                            <img src={MrchendImg1} alt="" />
                          </i>
                          <span>Merchandise Title</span>
                          <small>$25.69</small>
                        </div>
                      </Link>
                    </li>
                  </ul>
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
