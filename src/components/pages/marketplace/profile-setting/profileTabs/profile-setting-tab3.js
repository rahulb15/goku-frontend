import React, { Component } from 'react'

export default class NftTabs1 extends Component {
    render() {
        return (
            <>
                <div className='accHd bold'>
                    Notifications
                    <span>Add one or more wallets to showcase all your NFTs in one place. <a href="">Read more</a></span>
                </div>
                <div className='notificationList'>
                    <ul>
                        <li>
                            <div className='notifiLeft'>
                                <strong>Sales</strong>
                                <span>When one of your NFTs sells</span>
                            </div>
                            <div className='notifiRight'>
                                <input type="checkbox" />
                                <span>
                                    <i></i>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div className='notifiLeft'>
                                <strong>Successful bids</strong>
                                <span>When your bid was successful and the NFT is in your wallet</span>
                            </div>
                            <div className='notifiRight'>
                                <input type="checkbox" />
                                <span>
                                    <i></i>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div className='notifiLeft'>
                                <strong>Bids & Outbids</strong>
                                <span>When someone bids on one of your items or outbids yours bids</span>
                            </div>
                            <div className='notifiRight'>
                                <input type="checkbox" />
                                <span>
                                    <i></i>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div className='notifiLeft'>
                                <strong>Expired bids</strong>
                                <span>When your bid expires or gets deactivated because of insufficient funds</span>
                            </div>
                            <div className='notifiRight'>
                                <input type="checkbox" />
                                <span>
                                    <i></i>
                                </span>
                            </div>
                        </li>
                        <li>
                            <div className='notifiLeft'>
                                <strong>$RARI drops</strong>
                                <span>When you have $RARI to claim</span>
                            </div>
                            <div className='notifiRight'>
                                <input type="checkbox" />
                                <span>
                                    <i></i>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        )
    }

}