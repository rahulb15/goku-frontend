import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import { BsArrowLeft, BsSearch, BsEyeFill } from "react-icons/bs";
import TshirtImg from '../../../../assets/tshirt-icon.png'
import AddDesignImg from '../../../../assets/cooper_PosterImage.png'
import "./customize-merchandise.scss"

const Checkout = () => {
    return (
        <div>
            {/* <MarketplaceHeader /> */}
            <HeaderafterLogin />
            <div className='midSectionBx'>
                <div className='container'>
                    <div className='featCollectHd bold'><BsArrowLeft /> Customize Merchandise</div>
                    <div className='customizeOuter'>
                        <div className='customize_Left'>
                            <div className='frontbackBtn'>
                                <Button className='frontBtn'>Front</Button>
                                <Button className='backBtn'>Back</Button>
                            </div>
                            <div className='videwBtnBx'>
                                <Button><BsEyeFill /></Button>
                            </div>
                            <div className='tshirtImgBx'>
                                <img src={TshirtImg} alt='' />
                                <span></span>
                            </div>
                        </div>
                        <div className='customize_Right'>
                            <h3 className='bold'>Add Design</h3>
                            <div className='designSrch'>
                                <Input type='text' name='search' placeholder='Search NFT or creator' />
                                <Button><BsSearch /></Button>
                            </div>
                            <div className='designList'>
                                <ul>
                                    <li>
                                        <Button>
                                            <div className='adddesignImg'>
                                                <img src={AddDesignImg} alt='' />
                                                <span></span>
                                            </div>
                                            <div className='designame'>
                                                <small>Creator Name</small>
                                                <strong>NFT name here</strong>
                                            </div>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button>
                                            <div className='adddesignImg'>
                                                <img src={AddDesignImg} alt='' />
                                                <span></span>
                                            </div>
                                            <div className='designame'>
                                                <small>Creator Name</small>
                                                <strong>NFT name here</strong>
                                            </div>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button>
                                            <div className='adddesignImg'>
                                                <img src={AddDesignImg} alt='' />
                                                <span></span>
                                            </div>
                                            <div className='designame'>
                                                <small>Creator Name</small>
                                                <strong>NFT name here</strong>
                                            </div>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button>
                                            <div className='adddesignImg'>
                                                <img src={AddDesignImg} alt='' />
                                                <span></span>
                                            </div>
                                            <div className='designame'>
                                                <small>Creator Name</small>
                                                <strong>NFT name here</strong>
                                            </div>
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                            <div className='paymentBtn'>
                                <Button>Next</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MarketplaceFooter />
        </div>
    )
}

export default Checkout