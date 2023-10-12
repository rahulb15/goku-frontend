import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
//import { FiSearch } from "react-icons/fi";
import SearchIcon from "@mui/icons-material/Search";
// import srchBtnLight from '../../../../../assets/searchBtn-img.png'
// import srchBtnDark from '../../../../../assets/searchBtn-img-dark.png'
// import KadanaLight from '../../../../../assets/kadana-light.png'
// import CollectiblesLight from '../../../../../assets/collectibles-light.png'
// import BarLight from '../../../../../assets/bar-light.png'
// import textureImg from '../../../../../assets/texture.png'

export const MarketplaceBanner = () => {
  return (
    <div>
      <div className="mpBannerOuter">
        <div className="container">
          <div className="mpBannerImg">
            <div className="mp-banner_Left">
              <div className="banserchBx">
                <div className="communityCont">
                  <span>Community</span>
                  <strong className="mp_two_test extrabold">
                    Marketplace<span className="two_new"></span>
                  </strong>
                </div>
                <div className="bannerSrch">
                  <Form>
                    <FormGroup className="srchFrmBx">
                      <Input
                        type="text"
                        name="name"
                        className="srchInp"
                        placeholder="Search by collection, NFT or user"
                      />
                      <Button>
                        <SearchIcon />
                      </Button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
            <div className="mp-banner_Right">
              <div className="bannerImg bg-Group_8"></div>
              <div className="bannerImg bg-Blockchain"></div>
              <div className="bannerImg bg-Arrow"></div>
              <div className="bannerImg bg-Kadena"></div>
              <div className="bannerImg bg-Layer_1_1"></div>
              <div className="bannerImg bg-Collectibles"></div>
              <div className="bannerImg bg-SY__4__1"></div>
              <div className="bannerImg bg-Scribble"></div>
              <div className="bannerImg bg-_unique"></div>
              <div className="unlockCont">
                Unlock the potential of NFTs with Kryptomerch's innovative
                marketplace and merchandise hub.
              </div>
              {/* <div className="nftLightBg">
                                    <img src={textureImg} alt="" />
                                </div>
                                <img className='nftlight' src={NFTLight} alt="" />
                                <img className='uniquelight' src={UniqueLight} alt="" />
                                <img className='kadanalight' src={KadanaLight} alt="" />
                                <img className='colllight' src={CollectiblesLight} alt="" />
                                <img className='barlight' src={BarLight} alt="" />
                                */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
