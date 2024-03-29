import React, { useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
// REDUX
import { useDispatch } from 'react-redux';
import {fetchSearchPhoto, selectedCatagory} from '../../features/photo/photoSlice';
import {fetchSearchVideo} from "../../features/video/videoSlice";
// THIRD LIBARIES
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive'
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const CatagorySwiper = ({ catagories }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const swiperRef = useRef();

  const catagoryPhotoHandler = (catagory) => {
    if (currentPath === '/explore/photos' || currentPath ==='/search/photos') {
      navigate('/search/photos')
      dispatch(selectedCatagory(catagory))
      dispatch(fetchSearchPhoto())
    } if (currentPath === '/explore/videos' || currentPath ==='/search/videos') {
          navigate('/search/videos')
          dispatch(selectedCatagory(catagory))
          dispatch(fetchSearchVideo())
    }
  }

  return (
    <>
      <button className='mr-1 lg:mr-5' onClick={() => swiperRef.current?.slidePrev()}><FaAngleLeft /></button>
      <Swiper
        slidesPerView={isTabletOrMobile ? 2 : 5}
        spaceBetween={isTabletOrMobile ? 20 : 50}
        freeMode={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, FreeMode]}
      >
        {catagories.map((catagory, index) => (
          <SwiperSlide key={index}>
            <div>
              <button
                onClick={() => catagoryPhotoHandler(catagory)}
                className='font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-gray900 text-gray100 w-full h-11 border-primary3'>
                {catagory}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className='ml-1 lg:ml-5' onClick={() => swiperRef.current?.slideNext()}><FaAngleRight /></button>
    </>
  )
}

export default CatagorySwiper