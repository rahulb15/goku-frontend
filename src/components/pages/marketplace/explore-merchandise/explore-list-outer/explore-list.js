import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ExploreImg from '../../../../../assets/explore-listImg.png'
import { FaTshirt } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import { BsGridFill, BsSearch } from "react-icons/bs";
import { RiGridFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import ExploreSideBar from './explore-sidebar'

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
                            <div className='fltrRgtInn_Left'>
                                <div className='iftSrch'>
                                    <FormGroup>
                                        <Input type="email" name="email" id="exampleEmail" placeholder="Search by NFTs" />
                                    </FormGroup>
                                    <button><BsSearch /></button>
                                </div>
                            </div>
                            <div className='fltrRgtInn_Right'>
                                <div className='trendingBtn'>
                                    <FormGroup>
                                        <Input type="select" name="select" placeholder='Trending' id="exampleSelect">
                                            <option>Trending</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
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
                        <ExploreSideBar />
                    </div>
                    <div className='nftFlt_Right'>
                        <div className='nftList'>
                            <ul>
                                <li>
                                    <a href='/marketplace/nft-overview'>
                                        <div className='featItemBx'>
                                            <div className="glow">

                                                <div className='featImg'>
                                                    <img src={ExploreImg} alt='' />

                                                </div>
                                                <div className='feattitle'>
                                                    <small>NFT name here </small>
                                                    <span className='bold'>Merchandise Title</span>
                                                </div>
                                                <div className='featpriceOut'>
                                                    <div className='featprice'>
                                                        <small>Price</small>
                                                        <span className='bold'>$25.69</span>
                                                    </div>
                                                    <div className='featprice'>
                                                        <small>Creator</small>
                                                        <span className='bold'>John deo</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href='/marketplace/nft-overview'>
                                        <div className='featItemBx'>
                                            <div className="glow">

                                                <div className='featImg'>
                                                    <img src={ExploreImg} alt='' />

                                                </div>
                                                <div className='feattitle'>
                                                    <small>NFT name here </small>
                                                    <span className='bold'>Merchandise Title</span>
                                                </div>
                                                <div className='featpriceOut'>
                                                    <div className='featprice'>
                                                        <small>Price</small>
                                                        <span className='bold'>$25.69</span>
                                                    </div>
                                                    <div className='featprice'>
                                                        <small>Creator</small>
                                                        <span className='bold'>John deo</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href='/marketplace/nft-overview'>
                                        <div className='featItemBx'>
                                            <div className="glow">

                                                <div className='featImg'>
                                                    <img src={ExploreImg} alt='' />

                                                </div>
                                                <div className='feattitle'>
                                                    <small>NFT name here </small>
                                                    <span className='bold'>Merchandise Title</span>
                                                </div>
                                                <div className='featpriceOut'>
                                                    <div className='featprice'>
                                                        <small>Price</small>
                                                        <span className='bold'>$25.69</span>
                                                    </div>
                                                    <div className='featprice'>
                                                        <small>Creator</small>
                                                        <span className='bold'>John deo</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href='/marketplace/nft-overview'>
                                        <div className='featItemBx'>
                                            <div className="glow">

                                                <div className='featImg'>
                                                    <img src={ExploreImg} alt='' />

                                                </div>
                                                <div className='feattitle'>
                                                    <small>NFT name here </small>
                                                    <span className='bold'>Merchandise Title</span>
                                                </div>
                                                <div className='featpriceOut'>
                                                    <div className='featprice'>
                                                        <small>Price</small>
                                                        <span className='bold'>$25.69</span>
                                                    </div>
                                                    <div className='featprice'>
                                                        <small>Creator</small>
                                                        <span className='bold'>John deo</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href='/marketplace/nft-overview'>
                                        <div className='featItemBx'>
                                            <div className="glow">

                                                <div className='featImg'>
                                                    <img src={ExploreImg} alt='' />

                                                </div>
                                                <div className='feattitle'>
                                                    <small>NFT name here </small>
                                                    <span className='bold'>Merchandise Title</span>
                                                </div>
                                                <div className='featpriceOut'>
                                                    <div className='featprice'>
                                                        <small>Price</small>
                                                        <span className='bold'>$25.69</span>
                                                    </div>
                                                    <div className='featprice'>
                                                        <small>Creator</small>
                                                        <span className='bold'>John deo</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href='/marketplace/nft-overview'>
                                        <div className='featItemBx'>
                                            <div className="glow">

                                                <div className='featImg'>
                                                    <img src={ExploreImg} alt='' />

                                                </div>
                                                <div className='feattitle'>
                                                    <small>NFT name here </small>
                                                    <span className='bold'>Merchandise Title</span>
                                                </div>
                                                <div className='featpriceOut'>
                                                    <div className='featprice'>
                                                        <small>Price</small>
                                                        <span className='bold'>$25.69</span>
                                                    </div>
                                                    <div className='featprice'>
                                                        <small>Creator</small>
                                                        <span className='bold'>John deo</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>

                                    <div className='featItemBx'>
                                        <div className="glow">

                                            <div className='featImg'>
                                                <img src={ExploreImg} alt='' />

                                            </div>
                                            <div className='feattitle'>
                                                <small>NFT name here </small>
                                                <span className='bold'>Merchandise Title</span>
                                            </div>
                                            <div className='featpriceOut'>
                                                <div className='featprice'>
                                                    <small>Price</small>
                                                    <span className='bold'>$25.69</span>
                                                </div>
                                                <div className='featprice'>
                                                    <small>Creator</small>
                                                    <span className='bold'>John deo</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='featItemBx'>
                                        <div className="glow">

                                            <div className='featImg'>
                                                <img src={ExploreImg} alt='' />

                                            </div>
                                            <div className='feattitle'>
                                                <small>NFT name here </small>
                                                <span className='bold'>Merchandise Title</span>
                                            </div>
                                            <div className='featpriceOut'>
                                                <div className='featprice'>
                                                    <small>Price</small>
                                                    <span className='bold'>$25.69</span>
                                                </div>
                                                <div className='featprice'>
                                                    <small>Creator</small>
                                                    <span className='bold'>John deo</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='featItemBx'>
                                        <div className="glow">

                                            <div className='featImg'>
                                                <img src={ExploreImg} alt='' />

                                            </div>
                                            <div className='feattitle'>
                                                <small>NFT name here </small>
                                                <span className='bold'>Merchandise Title</span>
                                            </div>
                                            <div className='featpriceOut'>
                                                <div className='featprice'>
                                                    <small>Price</small>
                                                    <span className='bold'>$25.69</span>
                                                </div>
                                                <div className='featprice'>
                                                    <small>Creator</small>
                                                    <span className='bold'>John deo</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='featItemBx'>
                                        <div className="glow">

                                            <div className='featImg'>
                                                <img src={ExploreImg} alt='' />

                                            </div>
                                            <div className='feattitle'>
                                                <small>NFT name here </small>
                                                <span className='bold'>Merchandise Title</span>
                                            </div>
                                            <div className='featpriceOut'>
                                                <div className='featprice'>
                                                    <small>Price</small>
                                                    <span className='bold'>$25.69</span>
                                                </div>
                                                <div className='featprice'>
                                                    <small>Creator</small>
                                                    <span className='bold'>John deo</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='featItemBx'>
                                        <div className="glow">

                                            <div className='featImg'>
                                                <img src={ExploreImg} alt='' />

                                            </div>
                                            <div className='feattitle'>
                                                <small>NFT name here </small>
                                                <span className='bold'>Merchandise Title</span>
                                            </div>
                                            <div className='featpriceOut'>
                                                <div className='featprice'>
                                                    <small>Price</small>
                                                    <span className='bold'>$25.69</span>
                                                </div>
                                                <div className='featprice'>
                                                    <small>Creator</small>
                                                    <span className='bold'>John deo</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='featItemBx'>
                                        <div className="glow">

                                            <div className='featImg'>
                                                <img src={ExploreImg} alt='' />

                                            </div>
                                            <div className='feattitle'>
                                                <small>NFT name here </small>
                                                <span className='bold'>Merchandise Title</span>
                                            </div>
                                            <div className='featpriceOut'>
                                                <div className='featprice'>
                                                    <small>Price</small>
                                                    <span className='bold'>$25.69</span>
                                                </div>
                                                <div className='featprice'>
                                                    <small>Creator</small>
                                                    <span className='bold'>John deo</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </div>
                        <div className='loadmoreBtn'>
                            <button>Load More</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}