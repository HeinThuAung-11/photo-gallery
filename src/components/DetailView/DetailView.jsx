import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Loader from '../Loader/Loader'
import { IoLinkSharp } from "react-icons/io5";

const DetailView = ({ photoDetailInfo, photoLoading }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  return (
    <>
      {photoLoading ?
        <div className='mt-96'>
          <Loader />
        </div>
        :
        <div>
          <hr className='text-[#AAAAAA] mt-2' />
          <div className='gap-14 columns-1 lg:columns-2 mt-14'>
            <div className='w-full'>
              {photoLoading ?
                <p className='text-3xl text-center'>
                  Loading...
                </p>
                :
                <img className={isTabletOrMobile ? `mx-auto` : `ml-auto`} src={photoDetailInfo?.src?.large} alt="photo_detail" />
              }
            </div>
            <div className='w-full'>

              <h1 className='font-rockwell text-2xl mt-5 lg:mt-0 tracking-wide'>
                {photoDetailInfo.alt === "" ? <>{photoDetailInfo.photographer}'s photo</> : photoDetailInfo.alt}
              </h1>

              <hr className='text-[#AAAAAA] my-5' />

              <h1 className='font-montserrat font-normal my-5'>
                <span className='font-bold'>Photographer</span>: &nbsp;
                <a href={photoDetailInfo.photographer_url}
                  target='_blank'
                  rel="noreferrer"
                  className='inline-flex items-center hover:opacity-80'>
                  {photoDetailInfo.photographer}
                  <IoLinkSharp className="w-6 h-6 ml-1 " />
                </a>
              </h1>

              <div className='gap-3 columns-2'>
                <div className='mx-5'>
                  <button
                    className='font-montserrat font-semibold tracking-wider text-sm lg:text-base bg-gray900 text-gray100 w-full h-11 border-primary3 px-3'>
                    Free Download
                  </button>
                </div>
                <div className='mx-5'>
                  <button
                    className='font-montserrat font-semibold tracking-wider text-sm lg:text-base bg-gray900 text-gray100 w-full h-11 border-primary3'>
                    Save to Collection
                  </button>
                </div>
              </div>

              <h1 className='font-rockwell text-2xl mt-16'>More like this</h1>

              <hr className='text-[#AAAAAA] my-5' />

              <div>
                More mansory grid here
              </div>
            </div>
          </div>
        </div>
      }
    </>

  )
}

export default DetailView