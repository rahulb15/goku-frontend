import React, { Component } from 'react'
//import { Button } from 'reactstrap';
import designCollectionImg1 from '../../../../assets/designer-collection-img1.png'
import designCollectionImg2 from '../../../../assets/designer-collection-img2.png'
import designCollectionImg3 from '../../../../assets/designer-collection-img3.png'
import designCollectionImg4 from '../../../../assets/designer-collection-img4.png'
import designCollectionImg5 from '../../../../assets/designer-collection-img5.png'
import designCollectionImg6 from '../../../../assets/designer-collection-img6.png'
//Owl Carousel Libraries and Module
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//Owl Carousel Settings
const options = {
    responsiveClass: true,
    nav: true,
    margin: 20,
    autoplay: false,
    navText: ["Prev", "Next"],
    smartSpeed: 1000,
    loop: true,
    responsive: {
        0: {
            items: 2,
        },
        400: {
            items: 2,
        },
        600: {
            items: 3,
        },
        700: {
            items: 4,
        },
        1000: {
            items: 6,
        }
    },
};
export default class NftProjectSlider extends Component {
    render() {

        return (
            <div className='nftslideOuter'>
                <div className='nftfeatHd bold'>Collection name here</div>
                <div className='carousalOuter'>
                    <OwlCarousel className="slider-items owl-carousel" {...options}>
                        <div className='item'>
                            <div className='designCollection'>
                                <i><img src={designCollectionImg1} alt='' /></i>
                                <span>Merchandise Title</span>
                                <small>$25.69</small>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='designCollection'>
                                <i><img src={designCollectionImg2} alt='' /></i>
                                <span>Merchandise Title</span>
                                <small>$25.69</small>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='designCollection'>
                                <i><img src={designCollectionImg3} alt='' /></i>
                                <span>Merchandise Title</span>
                                <small>$25.69</small>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='designCollection'>
                                <i><img src={designCollectionImg4} alt='' /></i>
                                <span>Merchandise Title</span>
                                <small>$25.69</small>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='designCollection'>
                                <i><img src={designCollectionImg5} alt='' /></i>
                                <span>Merchandise Title</span>
                                <small>$25.69</small>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='designCollection'>
                                <i><img src={designCollectionImg6} alt='' /></i>
                                <span>Merchandise Title</span>
                                <small>$25.69</small>
                            </div>
                        </div>
                    </OwlCarousel>
                </div>
            </div>
        )
    };
}
