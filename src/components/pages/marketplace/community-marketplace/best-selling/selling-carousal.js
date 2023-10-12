import React, { Component } from 'react'
import { Button } from 'reactstrap';
import MrchendImg1 from '../../../../../assets/bestsell-img1.png'
import MrchendImg2 from '../../../../../assets/bestsell-img2.png'
import MrchendImg3 from '../../../../../assets/bestsell-img3.png'
import MrchendImg4 from '../../../../../assets/bestsell-img4.png'
//Owl Carousel Libraries and Module
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//Owl Carousel Settings
// const options = {
//   responsiveClass: true,
//   nav: true,
//   margin:20,
//   autoplay: false,
//   navText: ["Prev", "Next"],
//   smartSpeed: 1000,
//   loop: true,
//   responsive: {
//       0: {
//           items: 1,
//       },
//       400: {
//           items: 2,
//       },
//       600: {
//           items: 2,
//       },
//       700: {
//           items: 3,
//       },
//       1000: {
//           items: 4,
//       }
//   },
// };
const options = {
    responsiveClass: true,
    nav: true,
    autoplay: false,
    navText: ["Prev", "Next"],
    smartSpeed: 1000,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };
export default class SellingCrousal extends Component{
  render() {
   
    return (
        <div>
            <div className='carousalOuter'>
                <OwlCarousel className="slider-items owl-carousel" {...options}>
                    <div className='item' style={{marginRight:'10px'}}>
                        <div className='featItemBx'>
                        <div className="glow">
                            <div className='featImg'><img src={MrchendImg1} alt='' />
                            <div class="tshirtIcon"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z"></path></svg></div>
                            </div>
                            <div className='feattitle'>
                                <small>NFT name here</small>
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
                    </div>
                    <div className='item' style={{marginRight:'10px'}}>
                        <div className='featItemBx'>
                        <div className="glow">
                            <div className='featImg'><img src={MrchendImg2} alt='' />
                            <div class="tshirtIcon"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z"></path></svg></div>

                            </div>
                            <div className='feattitle'>
                                <small>NFT name here</small>
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
                    </div>
                    <div className='item' style={{marginRight:'10px'}}>
                        <div className='featItemBx'>
                        <div className="glow">
                            <div className='featImg'><img src={MrchendImg3} alt='' />
                            <div class="tshirtIcon"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z"></path></svg></div>
                            </div>
                            <div className='feattitle'>
                                <small>NFT name here</small>
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
                    </div>
                    <div className='item' style={{marginRight:'10px'}}>
                        <div className='featItemBx'>
                        <div className="glow">

                            <div className='featImg'><img src={MrchendImg4} alt='' />
                            <div class="tshirtIcon"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M631.2 96.5L436.5 0C416.4 27.8 371.9 47.2 320 47.2S223.6 27.8 203.5 0L8.8 96.5c-7.9 4-11.1 13.6-7.2 21.5l57.2 114.5c4 7.9 13.6 11.1 21.5 7.2l56.6-27.7c10.6-5.2 23 2.5 23 14.4V480c0 17.7 14.3 32 32 32h256c17.7 0 32-14.3 32-32V226.3c0-11.8 12.4-19.6 23-14.4l56.6 27.7c7.9 4 17.5.8 21.5-7.2L638.3 118c4-7.9.8-17.6-7.1-21.5z"></path></svg></div>
                            </div>
                            <div className='feattitle'>
                                <small>NFT name here</small>
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
                    </div>
                    
                    
                </OwlCarousel>
            </div>
        </div>
    )
};
}
