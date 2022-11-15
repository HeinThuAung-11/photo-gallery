import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import resolveConfig from 'tailwindcss/resolveConfig';

const CatagorySwiper = ({ catagories }) => {
  console.log(resolveConfig)
  return (
    <>
      <button className='mr-5'><FaAngleLeft /></button>
      <Swiper
        slidesPerView={2}
        spaceBetween={50}
        freeMode={true}
        navigation={true}
        modules={[FreeMode, Navigation]}
      >
        {catagories.map((catagory, index) => (
          <SwiperSlide key={index}>
            <button className='font-montserrat font-semibold tracking-wider bg-gray900 text-gray100 w-full h-11'>
              {catagory}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className='ml-5'><FaAngleRight /></button>

    </>
  )
}

export default CatagorySwiper