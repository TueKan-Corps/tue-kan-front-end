import React from 'react'

import Slider from "react-slick";

import './style.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {bannerData} from './bannerData.js';


export default class Banner extends React.Component {

  render() {

    const handleOnDragStart = (e) => e.preventDefault()

    const CreateBan =(props)=> {
      return (
        <div>
            <a href={props.link}>
                <img src={props.src} onDragStart={handleOnDragStart} className="banner-img" alt={props.alt}/>
            </a>
        </div>
      )
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dotsClass: "slick-dots", 
      };

      return (
        <div className="page">
          <div className="slide">
            <Slider {...settings}>
              {
                bannerData.map(ban =>(
                  <CreateBan key={ban.id} src={ban.src} alt={"ban-" + ban.id}/>
                ))
              }
            </Slider>
          </div>
        </div>
      );
    }

}
