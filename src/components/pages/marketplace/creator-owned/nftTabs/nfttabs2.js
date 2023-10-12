import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ownedImg1 from '../../../../../assets/owned-img1.png'
import { FaTshirt } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { BsGridFill, BsSearch } from "react-icons/bs";
import { RiGridFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import NFTSideBar from './nftsidebar'

export default class NftTabs1 extends Component {
    render() {
        return (
            <>
                <div className='filterBx'>
                    <div className='FltrLeft'>
                        <div className='fltrBtnBx'>
                            <Button className="filterBtn"><MdArrowBackIos /> Filter</Button>
                        </div>
                    </div>
                    <div className='FltrRight'>
                        <div className='fltrRgtInn'>
                            <div className='owndFlt_left'>
                                &nbsp;
                            </div>
                            <div className='fltrRgtInn_Right'>
                                <div className='trendingBtn'>
                                    <FormGroup>
                                        <Input type="select" name="select" placeholder='Trending' id="exampleSelect">
                                            <option>Recently listed</option>
                                        </Input>
                                    </FormGroup>
                                </div>
                                <div className='gridBtnBx'>
                                    <Button className='gridBtn'><BsGridFill /></Button>
                                    <Button className='gridListBtn'><RiGridFill /></Button>
                                </div>
                                <div className='refreshBtnBx'><Button><TbRefresh /></Button></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='nftProdListOuter'>
                    <div className='nftFlt_Left'>
                        <NFTSideBar />
                    </div>
                    <div className='nftFlt_Right'>
                        <div className='nftList'>
                            <ul>
                                <li>
                                    <div className='featItemBx'>
                                        <div className="glow">

                                            <div className='featImg'>
                                                <img src={ownedImg1} alt='' />
                                                <div className='tshirtIcon'><FaTshirt /></div>
                                            </div>
                                            <div className='feattitle'>
                                                <small>KDA Punk <HiCheckCircle /></small>
                                                <span className='bold'>KDA Punks #584</span>
                                            </div>
                                            <div className='featpriceOut'>
                                                <div className='featprice'>
                                                    <small>From</small>
                                                    <span className='bold'>21 KDA</span>
                                                </div>
                                                <div className='featprice'>
                                                    <small>Highest Bid</small>
                                                    <span className='bold'>6.5 KDA</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </li>
                                <li>
                                    <div className='featItemBx'>
                                        <div className="glow">

                                            <div className='featImg'>
                                                <img src={ownedImg1} alt='' />
                                                <div className='tshirtIcon'><FaTshirt /></div>
                                            </div>
                                            <div className='feattitle'>
                                                <small>KDA Punk <HiCheckCircle /></small>
                                                <span className='bold'>KDA Punks #584</span>
                                            </div>
                                            <div className='featpriceOut'>
                                                <div className='featprice'>
                                                    <small>From</small>
                                                    <span className='bold'>21 KDA</span>
                                                </div>
                                                <div className='featprice'>
                                                    <small>Highest Bid</small>
                                                    <span className='bold'>6.5 KDA</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}