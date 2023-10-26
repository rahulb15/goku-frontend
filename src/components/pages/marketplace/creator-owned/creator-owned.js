import React, { useEffect, useState } from "react";
//import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import NftListingTab from "./nft-listing-tab";
import { AiOutlineStar } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { HiCheckCircle } from "react-icons/hi";
import CreatorImg from "../../../../assets/proj-img2.png";
import DbImg from "../../../../assets/about-bannerImg.png";
import PassImg from "../../../../assets/banPriority.png";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../../common-components/header/header";
import "./creator-owned.scss";
import Background from "../../../../assets/creator-banner.png";
import { toast } from "react-toastify";
import Axios from "axios";
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TwitterShareButton,
    TwitterIcon,
  } from "react-share";

const CommunityMarketplace = () => {
  const { walletStatus, walletAddress, userName } = useSelector(
    (state) => state.walletStatus
  );
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  const [profileImg, setProfileImg] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [collectionData, setCollectionData] = useState();
  //get params from url
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo = params.get("name");
  console.log(foo, "foo");

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = () => {
    Axios.get("user/userInfo", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        // setLoading(false)

        setProfileImg(response.data.userInfo[0].profilePicture);
        setCoverImg(response.data.userInfo[0].coverPhoto);
      })
      .catch((error) => {});
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Wallet Address Copied");
  };

  const shareToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard");
  };

  return (
    <div>
      {/* <MarketplaceHeader /> */}
      <Header />
      <div
        className="creatorOuterBx"
        style={{ background: `url(${foo ? foo === "PriorityPass" ? PassImg : DbImg : CreatorImg})` }}
      >
        <div className="container">
          <div className="creatorDetBx">
            <div className="creatorImg">
              <img src={profileImg} alt="" />
            </div>
            <div className="creatorDet">
              <div className="creatorNameOuter">
                <div className="creatorName">
                  {foo
                    ? foo === "PriorityPass"
                      ? "Priority Pass"
                      : "DB Cooper"
                    : "Priority Pass and DB Cooper"}
                  <HiCheckCircle />
                  <div style={{ fontSize: "13px", marginTop: "5px" }}>
                    <strong style={{ marginRight: "5px", fontWeight: "bold" }}>
                      Created By
                    </strong>
                    <strong
                      style={{ fontSize: "16px", textTransform: "capitalize" }}
                    >
                      {userName}
                    </strong>
                  </div>
                </div>

                <div className="wishlist">
                  <span>
                    <EmailShareButton url={window.location.href}>
                      <EmailIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </EmailShareButton>
                    <FacebookShareButton url={window.location.href}>
                      <FacebookIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href}>
                      <TwitterIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </TwitterShareButton>
                    <WhatsappShareButton url={window.location.href}>
                      <WhatsappIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </WhatsappShareButton>
                    <TelegramShareButton url={window.location.href}>
                      <TelegramIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </TelegramShareButton>
                    {/* <BsGlobe style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={()=>{window.open(window.location.href)}}/> */}
                    {/* <BsTwitter style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToTwitter}/> */}
                    {/* <BsInstagram style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToInstagram}/> */}
                    {/* <span style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }}> */}
                    {/* <InstapaperShareButton url={window.location.href}>
                                                <BsInstagram style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }}/>
                                            </InstapaperShareButton> */}

                    {/* </span> */}
                    {/* <FaDiscord style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToDiscord}/> */}
                  </span>
                  <button onClick={shareToClipboard}>
                    <BsFillShareFill />
                  </button>
                </div>
              </div>
              <div className="kryptoCont">
                The collection name here is a collection of 10,000 unique
                Collection NFTs— unique digital collectibles living on the
                Kadena blockchain. Your Collection doubles as your Collection
                membership card, and grants access to...{" "}
                <a href="">Show more</a>
              </div>

              <div className="kryptoId">
                <div className="kryptoInn">
                  {walletAddress.slice(0, 8) + "..." + walletAddress.slice(-8)}
                  <MdOutlineContentCopy
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      copyToClipboard();
                    }}
                  />
                </div>
                {/* <div className='kryptocreator'>
                                        Created By
                                        <strong>KDA Punk</strong>
                                    </div> */}
              </div>
              {/* <div className='kryptoCont'>
                                    The collection name here is a collection of 10,000 unique Collection NFTs— unique digital collectibles living on the Kadena blockchain. Your Collection doubles as your Collection membership card, and grants access to... <a href="">Show more</a>
                                </div> */}

              <div className="items_qty">
                <div className="itemQtyBx">
                  <small>Items</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                    {collectionData?.collection_info[0]?.totalSupply}
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Owners</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                    {collectionData?.totalNftUser}
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Total Volume</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                    {collectionData?.totalNftPrice} KDA
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Floor Price</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                    {collectionData?.minNftPrice} KDA
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="creatortabOuter">
          <div className="container">
            <NftListingTab />
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
};

export default CommunityMarketplace;
