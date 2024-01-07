import React, { Component } from 'react'
import CollectImg1 from '../../../../../assets/collection-img1.png'
import CollectImg2 from '../../../../../assets/collection-img2.png'
import CollectImg3 from '../../../../../assets/collection-img3.png'
import CollectImg4 from '../../../../../assets/collection-img4.png'
import CollectImg5 from '../../../../../assets/collection-img5.png'
import { useState, useEffect } from 'react'
import Axios from "axios";
//import CollectImg6 from '../../../../../assets/collection-img6.png'

export default function OverviewTab1() {
    const [bigs, setBigs] = useState([]);
    const [floorPrice, setFloorPrice] = useState("");
    const search = window.location.search
    const params = new URLSearchParams(search)
    let foo = params.get('id')
    let foo2 = params.get("for");

    const getAllAuction = () => {
        const body = {
            _id: foo,
        };
        if (foo2 == "all") {
            Axios.post("/passDetails/all-nft-bids", body, {
                headers: { authorization: localStorage.getItem("accessJWT") },
            })
                .then((response) => {
                    if (response?.data?.status == "success") {
                        setBigs(response?.data?.data[0]?.bidInfo);
                        setFloorPrice(response?.data?.data[0]?.nftPrice);
                    } else {
                        setBigs([]);
                    }
                })
                .catch((error) => {
                });
        }
        else {
            Axios.post("/passDetails/all-nft-bids-pass", body, {
                headers: { authorization: localStorage.getItem("accessJWT") },
            })
                .then((response) => {
                    if (response?.data?.status == "success") {
                        setBigs(response?.data?.data[0]?.bidInfo);
                        setFloorPrice(response?.data?.data[0]?.nftPrice);
                    } else {
                        setBigs([]);
                    }
                })
                .catch((error) => {
                });
        }
    };
    useEffect(() => {
        getAllAuction();
    }, [])

    return (
        <div>
            <div className='latestBidBx'>
                <h3>Latest Bids</h3>
                {bigs?.length > 0 &&
                    bigs
                        .filter(item => {
                            return (item.bidPrice !== null && item.bidPrice !== "") && (item.bidder !== null && item.bidder !== "");
                        })
                        .slice(0, 10)
                        .map((item, index) => {
                            item.bidTime = new Date(item.bidTime)
                                .toISOString()
                                .slice(0, 19)
                                .replace('T', ' ');
    
                            return (
                                <ul key={index}>
                                    <li>
                                        <div className='collectionLeft'>
                                            {/* <i><img src={CollectImg1} alt="" /></i> */}
                                            <strong>{(item?.bidder)?.slice(0, 12)}...{(item?.bidder)?.slice(-5)}</strong>
                                            <small>Floor: {floorPrice} KDA <a href=''>Floor Bid</a></small>
                                        </div>
                                        <div className='collectionRight'>
                                            <strong>{item?.bidPrice} KDA</strong>
                                            <small>{item?.bidTime}</small>
                                        </div>
                                    </li>
                                </ul>
                            );
                        })}
            </div>
        </div>
    )
    

}


