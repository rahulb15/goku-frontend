import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import { BsArrowLeft, BsSearch, BsEyeFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import TshirtImg from '../../../../assets/tshirt-icon.png'
import DesignImg from '../../../../assets/designImg.png'
import NFTLogo from '../../../../assets/nft-logo.png'

import "./customize-merchandise-detail.scss"

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
                                <span><img src={NFTLogo} alt='' /></span>
                            </div>
                        </div>
                        <div className='customize_Right'>
                            <h3 className='bold'>Customize</h3>
                            <div className='custOuterBx'>
                                <div className='designBx'>
                                    <span>Design</span>
                                    <div className='designInnBx'>
                                        <i><img src={DesignImg} alt="" /></i>
                                        <span>Creator Name</span>
                                        <strong>NFT name here</strong>
                                    </div>
                                </div>
                                <div className='colorBx'>
                                    <span>Color</span>
                                    <Input type="checkbox" className='blackClr' />
                                    <Input type="checkbox" className='greenClr' />
                                    <Input type="checkbox" className='redClr' />
                                    <Input type="checkbox" className='yellowClr' />
                                    <Input type="checkbox" className='blueClr' />
                                </div>
                                <div className='sizeBx'>
                                    <span>Size</span>
                                    <button>S</button>
                                    <button>M</button>
                                    <button>L</button>
                                    <button>XL</button>
                                </div>
                                <div className='qtyBuyBx'>
                                    <span>Quantity</span>
                                    <FormGroup>
                                        <Input type="select" name="select" id="exampleSelect">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                    </FormGroup>
                                </div>
                            </div>
                            <div className='checkoutBtnOuter'>
                                <Button className='checkoutBtn'>Checkout</Button>
                                <Button className='CartBtn'>Add To Cart</Button>
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