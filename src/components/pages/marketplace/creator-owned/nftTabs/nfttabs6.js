import React, { Component } from 'react'
import marchendImg1 from '../../../../../assets/marchendies-img2.png'

export default class NftTabs1 extends Component {
    render() {
        return (
            <>
                <div className='marchendList'>
                    <ul>
                        <li className='bold'>
                            <i><img src={marchendImg1} alt='' /></i>
                            <span>Merchandise Title</span>
                            <small>$25.69</small>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}