import React, { Component } from 'react'
import { Input, FormGroup, Button } from 'reactstrap';
import overviewDetImg from '../../../../assets/overviewDet-img.png'
import { FaTshirt, FaEarlybirds, FaRegHeart, FaShoppingCart } from "react-icons/fa"
import { HiCheckCircle, HiEye, HiShare, HiOutlineRefresh, HiOutlineShoppingCart } from "react-icons/hi"
import MerchSlider from './merch-slider'

export default class OverviewDetail extends Component {
    render() {
        return (
            <div>
                <div className='overDet_Outer'>
                    <div className='overDet_Left'>
                        <MerchSlider />
                    </div>
                    <div className='overDet_Right'>
                        <div className='overviewTitl'>DBCooper</div>
                        <div className='overviewName bold'>Merchandise name here</div>
                        <div className='overviewOwnerOuter'>
                            <div className='overwOwner'>
                                <a href='/marketplace/create-owned'>
                                    <i></i>
                                    <span>Creator</span>
                                    <strong>John Deo</strong>
                                </a>
                            </div>
                        </div>
                        <div className='viewsBx'>
                            <div className='view'>
                                <a href=''>
                                    <i><HiEye /></i>
                                    458 views
                                </a>
                            </div>
                            <div className='view'>
                                <a href=''>
                                    <i><FaRegHeart /></i>
                                    1890
                                </a>
                            </div>
                            <div className='view'>
                                <a href=''>
                                    <i><HiShare /></i>
                                    Share
                                </a>
                            </div>
                            <div className='view'>
                                <a href=''>
                                    <i><HiOutlineRefresh /></i>
                                    Refresh
                                </a>
                            </div>
                        </div>
                        <div className='saleendOuter'>
                            <div className='colorBx'>
                                <span>Color</span>
                                <Input type="checkbox" className='blackClr' />
                                <Input type="checkbox" className='greenClr' />
                                <Input type="checkbox" className='redClr' />
                                <Input type="checkbox" className='yellowClr' />
                                <Input type="checkbox" className='blueClr' />
                                <Input type="checkbox" className='whiteClr' />
                            </div>
                            <div className='sizeBx'>
                                <span>Size</span>
                                <button className='active'>XS</button>
                                <button>S</button>
                                <button>M</button>
                                <button>L</button>
                                <button>XL</button>
                                <button>2XL</button>
                                <button>3XL</button>
                                <button>4XL</button>
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
                                <Button className="buyBtn">Buy Now</Button>
                                <Button className="cartBtn"><FaShoppingCart /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}