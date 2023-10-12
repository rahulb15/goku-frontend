import React, { Component } from 'react'
//import { Button } from 'reactstrap';
import mrkpaboutImg1 from '../../../../assets/kishu-img1.png'
import mrkpaboutImg2 from '../../../../assets/kishu-img2.png'
import mrkpaboutImg3 from '../../../../assets/kishu-img3.png'
import mrkpaboutImg4 from '../../../../assets/kishu-img4.png'

//Owl Carousel Libraries and Module
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//Owl Carousel Settings
const options = {
  responsiveClass: true,
  nav: true,
  margin:20,
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
export default class NftProjectSlider extends Component{
  render() {
    return (
        <div className='nftslideOuter'>
            <div className='nftfeatHd bold'>Kadena Komodos</div>
            <div className='carousalOuter'>
                <OwlCarousel className="slider-items owl-carousel" {...options}>
                    <div className='item'>
                        <div className=''><img src={mrkpaboutImg1} alt="" /></div>
                    </div>
                    <div className='item'>
                        <div className=''><img src={mrkpaboutImg2} alt="" /></div>
                    </div>
                    <div className='item'>
                        <div className=''><img src={mrkpaboutImg3} alt="" /></div>
                    </div>
                    <div className='item'>
                        <div className=''><img src={mrkpaboutImg4} alt="" /></div>
                    </div>
                    <div className='item'>
                        <div className=''><img src={mrkpaboutImg1} alt="" /></div>
                    </div>
                    <div className='item'>
                        <div className=''><img src={mrkpaboutImg3} alt="" /></div>
                    </div>
                    <div className='item'>
                        <div className=''><img src={mrkpaboutImg4} alt="" /></div>
                    </div>
                    <div className='item'>
                        <div className=''><img src={mrkpaboutImg1} alt="" /></div>
                    </div>
                    
                </OwlCarousel>
            </div>
        </div>
    )
};
}
