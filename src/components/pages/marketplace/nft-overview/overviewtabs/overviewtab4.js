import React, { Component } from 'react'
import CollectImg1 from '../../../../../assets/collection-img1.png'
import CollectImg2 from '../../../../../assets/collection-img2.png'
import CollectImg3 from '../../../../../assets/collection-img3.png'
import CollectImg4 from '../../../../../assets/collection-img4.png'
import CollectImg5 from '../../../../../assets/collection-img5.png'
import { useState,useEffect } from 'react'
import Axios from "axios";
import moment from 'moment';

export default function OverviewTab1() {

    const [history, setHistory] = useState([]);
    const [hoursAgos, setHoursAgos] = useState("");
    const search = window.location.search
    const params = new URLSearchParams(search)
        let foo = params.get('id')
        let foo2 = params.get("for");


    const getAllAuction = () => {
        const body = {
            _id: foo,
            };
            if (foo2 == "all") {

        Axios.post("/nft/getNftbyId", body, {
          headers: { authorization: localStorage.getItem("accessJWT") },
        })
          .then((response) => {
            if (response.data.status == "success") {
                setHistory(response.data.data[0].history);
            } else {
                setHistory([]);
            }
          })
          .catch((error) => {
          });
        }else {
            Axios.post("/passDetails/getNftPassbyId", body)
              .then((response) => {
                
                if (response.data.status == "success") {
                    setHistory(response.data.data[0].history);

                } else {
                    setHistory([]);
                }
              })
              .catch((error) => {
                
              });
          }
      };
    useEffect(() => {
        getAllAuction();
    }, [])
    

    // {
    //     "owner": "k:a1a5cc2c40ce6e96906426314998cd1c639f6a24ea96dc512d369d2e6dcb170a",
    //     "price": "0.00",
    //     "category": "mint",
    //     "_id": "651f04d2f5fa17fcbc1439d6",
    //     "date": "2023-10-05T18:47:46.457Z"
    // }

        return (
            <div>
                <div className='latestBidBx'>
                    <h3>History</h3>
                    {history?.length > 0 && history?.filter((item, index) => {
                        item.date = moment(item.date).utc().local().format('YYYY-MM-DD HH:mm');
                        //check if the date is less than 24 hours old then show it else dont and store hours ago in state
                        const newDate = moment(item.date).utc().local().format('YYYY-MM-DD HH:mm');
                        const hoursAgo = moment(newDate).fromNow();
                        
                        item.hoursAgo = hoursAgo;

                        //filter return all categories except originalPrice
                        return item.category != "originalPrice"
                    }
                    )?.filter((item, index) => {
                        return index < 10;
                    }
                    )?.map((item, index) => {
                        return (
                            <ul key={index}>
                                <li>
                                    <div className='collectionLeft'>
                                        {/* <i><img src={CollectImg1} alt="" /></i> */}
                                        <strong>{(item?.owner).slice(0, 12)}...{(item?.owner)?.slice(-5)}<span>{" " +item?.category}</span></strong>
                                        <small>{item?.hoursAgo ? item?.hoursAgo : ""}</small>
                                    </div>
                                    <div className='collectionRight'>
                                        <strong>{item?.price ? item?.price : "0.00"} KDA</strong>
                                        <small>{item?.date}</small>
                                    </div>
                                </li>
                            </ul>
                        )
                    })}
                    {history?.length == 0 && <p>No History Found</p>}


                    {/* <ul>
                        <li>
                            <div className='collectionLeft'>
                                <i><img src={CollectImg1} alt="" /></i>
                                <strong>0x83c...aba2<span> accepted bid</span></strong>
                                <small>2 hours ago</small>
                            </div>
                            <div className='collectionRight'>
                                <strong>6.8 KDA</strong>
                                <small>$16,760</small>
                            </div>
                        </li>
                        <li>
                            <div className='collectionLeft'>
                                <i><img src={CollectImg2} alt="" /></i>
                                <strong>0x83c...aba2<span> listed for</span></strong>
                                <small>2 hours ago</small>
                            </div>
                            <div className='collectionRight'>
                                <strong>6.8 KDA</strong>
                                <small>$16,760</small>
                            </div>
                        </li>
                        <li>
                            <div className='collectionLeft'>
                                <i><img src={CollectImg3} alt="" /></i>
                                <strong>0x83c...aba2<span> listed for</span></strong>
                                <small>2 hours ago</small>
                            </div>
                            <div className='collectionRight'>
                                <strong>6.8 KDA</strong>
                                <small>$16,760</small>
                            </div>
                        </li>
                        <li>
                            <div className='collectionLeft'>
                                <i><img src={CollectImg4} alt="" /></i>
                                <strong>0x83c...aba2<span> listed for</span></strong>
                                <small>2 hours ago</small>
                            </div>
                            <div className='collectionRight'>
                                <strong>6.8 KDA</strong>
                                <small>$16,760</small>
                            </div>
                        </li>
                        <li>
                            <div className='collectionLeft'>
                                <i><img src={CollectImg5} alt="" /></i>
                                <strong>0x83c...aba2<span> listed for</span></strong>
                                <small>2 hours ago</small>
                            </div>
                            <div className='collectionRight'>
                                <strong>6.8 KDA</strong>
                                <small>$16,760</small>
                            </div>
                        </li>
                    </ul> */}
                </div>

            </div>
        )
    }