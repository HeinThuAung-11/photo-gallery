import React from 'react'
import { Parallax } from 'react-parallax'
import './First.css'
import bird from '../../../assets/bird.jpg'

const First = () => {
  return (
    <Parallax className='image' blur={0} bgImage={bird} strength={800} bgImageStyle={{ minHeight: "100vh", objectFit: 'cover' }}>
        <div className='content'>
          <div className='center'>
            <h2 className='font-rockwell font-medium text-3xl lg:text-4xl text-gray100 tracking-wide'>
              Welcome to
            </h2>
            <h2 className='font-rockwell font-semibold text-4xl lg:text-5xl text-gray100 tracking-widest mt-3'>
              gallerymojo.
            </h2>
            <p className='font-montserrat text-lg lg:text-xl tracking-wide mt-5 text-gray100'>
              Explore and download your favourite images
              <br />in one place
            </p>
            <button
              className='home-button font-rockwell font-bold text-lg lg:text-xl tracking-wider w-[150px] lg:w-[200px] h-[55px] lg:h-[60px] text-gray900 mt-5 bg-secondary2 hover:bg-secondary1 hover:drop-shadow-none'>
              Explore
            </button>
          </div>
        </div>
      </Parallax>
  )
}

export default First