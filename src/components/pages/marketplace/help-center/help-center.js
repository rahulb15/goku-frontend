import React, { Component } from 'react'
import { Button, FormGroup, Label, Input } from 'reactstrap';
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import { FaSearch, FaWallet, FaTags, FaDiscourse, FaTshirt, FaHandshake, FaNotesMedical } from "react-icons/fa";
import { TbApps } from "react-icons/tb";
import { Link } from "react-router-dom";
import "./help-center.scss"

const HelpCenter = () => {
    return (
        <div>
            {/* <MarketplaceHeader /> */}
            <HeaderafterLogin />
            <div className='midSectionBx'>
                <div className='container'>
                    <div className='helpcenterHd extrabold'>
                        <span>Help</span> Center
                    </div>
                    <div className='helpSrchBx'>
                        <FormGroup>
                            <Input type="email" name="email" id="exampleEmail" placeholder="Search for help" />
                        </FormGroup>
                        <Button><FaSearch /></Button>
                    </div>
                    <div className='helpcenterList'>
                        <ul>
                            <li>
                                <Link to="/">
                                    <i><TbApps /></i>
                                    <span>Getting Started</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i><FaWallet /></i>
                                    <span>Buying</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i><FaTags /></i>
                                    <span>Selling</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i><FaTshirt /></i>
                                    <span>Merchandise</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i><FaDiscourse /></i>
                                    <span>FAQ's</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i><TbApps /></i>
                                    <span>Creating</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i><FaHandshake /></i>
                                    <span>Partners</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <i><FaNotesMedical /></i>
                                    <span>Developers</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='pramotedartHd bold'>Promoted Articles</div>
                    <div className='pramotedList'>
                        <ul>
                            <li><Link to="/">What is a wallet?</Link></li>
                            <li><Link to="/">Navigating Kryptomerch</Link></li>
                            <li><Link to="/">Setting up your account & Life hacks with NFTs!</Link></li>
                            <li><Link to="/">How do I report an NFT, user, or collection?</Link></li>
                            <li><Link to="/">Common Problems & Solutions</Link></li>
                            <li><Link to="/">Duplicate NFTs</Link></li>
                            <li><Link to="/">How do I re-apply for verification after denial?</Link></li>
                            <li><Link to="/">I should have recieved KDA, but I did not.</Link></li>
                            <li><Link to="/">Where is my minted NFT?</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <MarketplaceFooter />
        </div>
    )
}

export default HelpCenter;