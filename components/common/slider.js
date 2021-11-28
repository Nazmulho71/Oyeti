
import Slider from "react-slick"
import React, { Component } from "react";

// const   Index  = (props) => {

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1
//     }

//     return (
//         <Slider {...settings}>
//             {props.chlidren}
//         </Slider>
//     )
// }

// export default Index


export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: null,
      prevArrow: null
    };
    return (
      <Slider {...settings}>
        {this.props.children}
      </Slider>
    );
  }
}