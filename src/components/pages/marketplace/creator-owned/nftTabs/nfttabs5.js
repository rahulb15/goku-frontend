import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { BiTransfer } from "react-icons/bi";
import { FaTags, FaKickstarterK, FaBolt, FaFireAlt, FaHeart } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import activityImg1 from '../../../../../assets/nft-img2.png'
import activityImg2 from '../../../../../assets/nft-img1.png'
import activityImg3 from '../../../../../assets/nft-img3.png'
import activityImg4 from '../../../../../assets/nft-img4.png'




export default class NftTabs1 extends Component {


    render() {
        return (
            <>
                <div className='activityOuter'>
                    <div className='activity_Left'>
                        <div className='activityList'>
                            <ul>
                                <li>
                                    <div className='tagIcon'>
                                        <FaTags />
                                    </div>
                                    <div className='activityCont'>
                                        <i><img src={activityImg1} alt='' /></i>
                                        <h4>OS Offers (Bidding) Bot by David Nikolic Pass #01</h4>
                                        <span>1 edition minted by <i><HiCheckCircle /></i> <strong>Johndeo</strong></span>
                                        <small>9/20/2022, 12:16 AM</small>
                                    </div>
                                </li>
                                <li>
                                    <div className='tagIcon'>
                                        <FaHeart />
                                    </div>
                                    <div className='activityCont'>
                                        <i><img src={activityImg2} alt='' /></i>
                                        <h4>The Saudi Meta Airdrop</h4>
                                        <span>liked by <i><HiCheckCircle /></i> <strong>DBCooper</strong></span>
                                        <small>9/20/2022, 12:16 AM</small>
                                    </div>
                                </li>
                                <li>
                                    <div className='tagIcon'>
                                        <FaTags />
                                    </div>
                                    <div className='activityCont'>
                                        <i><img src={activityImg3} alt='' /></i>
                                        <h4>OtherSoil.xyz Mint Pass</h4>
                                        <span>listed by <i><HiCheckCircle /></i> <strong>Johndeo</strong> For <strong>200KDA</strong></span>
                                        <small>9/20/2022, 12:16 AM</small>
                                    </div>
                                </li>
                                <li>
                                    <div className='tagIcon'>
                                        <BiTransfer />
                                    </div>
                                    <div className='activityCont'>
                                        <i><img src={activityImg4} alt='' /></i>
                                        <h4>goblinchest.wtf Mint Pass</h4>
                                        <span>transferred from <i><HiCheckCircle /></i> <strong>Johndeo</strong> to <strong>alitawar</strong></span>
                                        <small>9/20/2022, 12:16 AM</small>
                                    </div>
                                </li>
                                <li>
                                    <div className='tagIcon'>
                                        <FaTags />
                                    </div>
                                    <div className='activityCont'>
                                        <i><img src={activityImg2} alt='' /></i>
                                        <h4>The Bard</h4>
                                        <span>1 edition minted by <i><HiCheckCircle /></i> <strong>Johndeo</strong></span>
                                        <small>9/20/2022, 12:16 AM</small>
                                    </div>
                                </li>
                                <li>
                                    <div className='tagIcon'>
                                        <FaTags />
                                    </div>
                                    <div className='activityCont'>
                                        <i><img src={activityImg1} alt='' /></i>
                                        <h4>Clonexpets.com Mint Pass</h4>
                                        <span>1 edition minted by <i><HiCheckCircle /></i> <strong>Johndeo</strong></span>
                                        <small>9/20/2022, 12:16 AM</small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='activity_Right'>
                        <div className='statusList'>
                            <h3>Filter</h3>
                            <ul>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            All
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            <FaBolt />
                                            Sales
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            <FaTags />
                                            Listings
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            <FaKickstarterK />
                                            Purchase
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                        <BiTransfer /> 
                                            Transfer
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                        <FaFireAlt />
                                            Burns
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            <FaHeart/>
                                            Likes
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}