import React, { Suspense } from 'react'
import './Third.css'
import { Parallax } from 'react-parallax'
import { Link } from 'react-router-dom'
import flower from '../../../assets/images/flower.jpg'

const Third = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Parallax className='image3' blur={0} bgImage={flower} strength={500} bgImageStyle={{ minHeight: "100vh", objectFit: 'cover' }}>
                <div className='content3'>
                    <div className='center3'>
                        <h2 className='font-rockwell font-medium text-3xl lg:text-4xl text-gray100 tracking-wide'>
                            Explore
                        </h2>
                        <h2 className='font-rockwell font-semibold text-4xl lg:text-5xl text-gray100 tracking-widest mt-3'>
                            Videos
                        </h2>
                        <p className='font-montserrat text-lg lg:text-xl tracking-wide mt-5 text-gray100'>
                            Watch and download entertaining videos.
                        </p>
                        <Link to='/explore/videos'>
                            <button
                                className='home-button font-rockwell font-bold text-lg lg:text-xl tracking-wider w-[100%] lg:w-[70%] h-[70px] lg:h-[60px] px-4 text-gray900 mt-5 bg-secondary2 hover:bg-secondary1 hover:drop-shadow-none'>
                                Discover Videos
                            </button>
                        </Link>
                    </div>
                </div>
            </Parallax>
        </Suspense>
    )
}

export default Third