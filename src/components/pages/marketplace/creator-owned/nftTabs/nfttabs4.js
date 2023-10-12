import React, { Component } from 'react'
import CollectionImg from '../../../../../assets/collection-img1.png'
import { HiCheckCircle } from "react-icons/hi";

export default class NftTabs1 extends Component {
    render() {
        return (
            <>
                <div className='collectionLest'>
                    <ul>
                        <li>
                            <div className='collectionImg'>
                                <img src={CollectionImg} alt='' />
                                <i>
                                    <img src={CollectionImg} alt='' />
                                </i>
                            </div>
                            <div className='collectionHd bold'>
                                Kda Punk <HiCheckCircle />
                            </div>
                            <div className='ownersValueOuter'>
                                <div className='ownvalueInn'>
                                    <span>Owners</span>
                                    <strong>504</strong>
                                </div>
                                <div className='ownvalueInn'>
                                    <span>Total Volume</span>
                                    <strong>843.8K</strong>
                                </div>
                                <div className='ownvalueInn'>
                                    <span>Floor</span>
                                    <strong>482</strong>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        )
    }

}