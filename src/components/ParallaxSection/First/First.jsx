import React, { Suspense } from 'react'
import { Parallax } from 'react-parallax'
import './First.css'
import bird from '../../../assets/images/bird.jpg'

const First = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Parallax
        lazy={false}
        className='image1'
        blur={0}
        bgImage={bird}
        strength={500}
        bgImageStyle={{ minHeight: "100vh", objectFit: 'cover' }} l>
        <div className='content1'>
          <div className='center1'>
            <h2 className='font-rockwell font-medium text-3xl lg:text-4xl text-gray100 tracking-wide'>
              Welcome to
            </h2>
            <h2 className='font-rockwell font-semibold text-4xl lg:text-5xl text-gray100 tracking-widest mt-3'>
              gallerymojo.
            </h2>
            <p className='font-montserrat text-lg lg:text-xl tracking-wide mt-5 text-gray100'>
              The <em className='underline'>easiest way</em> to save and download <br />
              your favourite photos and videos.
            </p>
          </div>
        </div>
      </Parallax>
    </Suspense>
  )
}

export default First