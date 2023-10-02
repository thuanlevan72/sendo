import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const img = ['https://media3.scdn.vn/img4/2022/05_31/I1qbSQQnpTMmWOTG68Rq_simg_de2fe0_500x500_maxb.png', 'https://media3.scdn.vn/img4/2022/05_31/S1Cn4ujZCtvrlIWpaIpe_simg_de2fe0_500x500_maxb.png', 'https://media3.scdn.vn/img4/2022/05_31/o0rEFXiGJxZ2bXMdrC2u_simg_de2fe0_500x500_maxb.png']


const MyCarousel = () => {
  const settings = {
    slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.slider-nav'
  };

  const settingNav={
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    focusOnSelect: true
  }

  return (
    <div>
      <h2>My Carousel</h2>
      <Slider {...settings} className='slider-for'>
        <div>
          <img src={img[0]} alt="Slide 1" />
        </div>
        <div>
          <img src={img[1]} alt="Slide 2" />
        </div>
        <div>
          <img src={img[2]} alt="Slide 3" />
        </div>
        {/* Add more slide elements as needed */}
      </Slider>
      <Slider {...settingNav} className='slider-nav'>
        <div >
          <img src={img[0]} alt="Slide 1" />
        </div>
        <div>
          <img src={img[1]} alt="Slide 2" />
        </div>
        <div>
          <img src={img[2]} alt="Slide 3" />
        </div>
        {/* Add more slide elements as needed */}
      </Slider>
    </div>
  );
};

export default MyCarousel;