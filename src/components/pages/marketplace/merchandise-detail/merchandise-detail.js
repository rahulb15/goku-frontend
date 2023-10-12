import React, { Component } from 'react'
import { Table } from 'reactstrap';
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import Overdetail from './overviewDetail'
import MoreCollection from '../community-marketplace/trending-nft/trending-carousal'
import { IoShirtOutline } from "react-icons/io5";
import { BsLayers } from "react-icons/bs";
import "./merchandise-detail.scss"
import { useDispatch, useSelector } from 'react-redux';

const MerchandiseDetail = () => {
    const { nightModeStatus } = useSelector(
        (state) => state.nightModeStatus
    );
    return (
        <div>

            <HeaderafterLogin />
            <div className='midSectionBx'>
                <div className='container'>
                    <Overdetail />
                    <div className='merchAbout'>
                        <h3 className='extrabold'>About</h3>
                        <p>This personalized face mask for kids comes to add the right attitude on a daily staple. Made with durable, 2ply polyester fabric, these facemasks are highly reusable and can withstand daily use. Add your own designs and create a stylish choice that any kid will want to wear.</p>
                    </div>
                    <div className='keyfeatBx'>
                        <h3>Key Features</h3>
                        <ul>
                            <li>
                                <i><IoShirtOutline /></i>
                                <strong>With side seams</strong>
                                <span>Located along the sides, they help hold the garment's shape longer and give it structural support</span>
                            </li>
                            <li>
                                <i><BsLayers /></i>
                                <strong>Ribbed knit collar with seam</strong>
                                <span>Ribbed knit makes the collar highly elastic and helps retain its shape</span>
                            </li>
                            <li>
                                <i><IoShirtOutline /></i>
                                <strong>Shoulder tape</strong>
                                <span>Twill tape covers the shoulder seams to stabilize the back of the garment and prevent stretching</span>
                            </li>
                            <li>
                                <i><IoShirtOutline /></i>
                                <strong>Fiber composition</strong>
                                <span>Solid colors are 100% cotton except Ash - 99% cotton and 1% polyester, heather colors are 52% cotton, 48% polyester (Athletic Heather and Black Heather are 90% cotton, 10% polyester)</span>
                            </li>
                        </ul>
                    </div>
                    <div className='careInstBx bold'>
                        <h3>Care Instructions</h3>
                        <span>Non-chlorine: bleach as needed</span>
                        <span>Tumble dry: low heat; Iron </span>
                        <span>Steam or dry: medium heat </span>
                        <span>Do not dryclean </span>
                        <span>Machine wash: cold (max 30C or 90F).</span>
                    </div>
                    <div className='careInstBx'>
                        <h3>Size Guide</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>XS</th>
                                    <th>S</th>
                                    <th>M</th>
                                    <th>L</th>
                                    <th>XL</th>
                                    <th>2XL</th>
                                    <th>3XL</th>
                                    <th>4XL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Width, in</td>
                                    <td>16.50</td>
                                    <td>17.99</td>
                                    <td>20.00</td>
                                    <td>22.01</td>
                                    <td>24.02</td>
                                    <td>25.98</td>
                                    <td>27.99</td>
                                    <td>30.00</td>
                                </tr>
                                <tr>
                                    <td>Length, in</td>
                                    <td>27.01</td>
                                    <td>27.99</td>
                                    <td>29.02</td>
                                    <td>30.00</td>
                                    <td>31.02</td>
                                    <td>32.01</td>
                                    <td>32.99</td>
                                    <td>33.98</td>
                                </tr>
                                <tr>
                                    <td>Sleeve length, in</td>
                                    <td>8.62</td>
                                    <td>8.90</td>
                                    <td>9.17</td>
                                    <td>9.45</td>
                                    <td>9.72</td>
                                    <td>10.00</td>
                                    <td>10.39</td>
                                    <td>10.79</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className='moreCollection'>
                        <div className={nightModeStatus ? 'market_mainHd' : 'market_mainHd_Night'}>
                            <h2 className='extrabold'>Similar Items</h2>
                        </div>
                        <MoreCollection />
                    </div>
                </div>
            </div>
            <MarketplaceFooter />
        </div>
    )
}

export default MerchandiseDetail