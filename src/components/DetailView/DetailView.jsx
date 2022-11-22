import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import Loader from '../Loader/Loader'
import { IoLinkSharp } from "react-icons/io5";
import { FaRegBookmark, FaChevronDown } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRelatedPhotos } from '../../features/photo/photoSlice';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from 'react-router-dom';



const DetailView = ({ photoDetailInfo, photoLoading }) => {
  const dispatch = useDispatch();
  const { relatedPhotos } = useSelector(store => store.photos);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  useEffect(() => {
    dispatch(fetchRelatedPhotos(photoDetailInfo.avg_color))
  }, [dispatch, photoDetailInfo.avg_color])

  console.log(relatedPhotos)

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

              <div className='grid grid-rows-2'>
                <h1 className='font-rockwell text-2xl m-5 lg:mt-0 tracking-wide'>
                  {photoDetailInfo.alt === "" ? <>{photoDetailInfo.photographer}'s photo</> : photoDetailInfo.alt}
                </h1>

                <hr className='text-[#AAAAAA] my-5' />

                <h1 className='font-montserrat font-normal m-5'>
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
                      className='font-montserrat font-semibold tracking-wider text-sm lg:text-base bg-primary2 hover:opacity-90 text-gray100 drop-shadow-lg w-full h-11 inline-flex items-center justify-center hover:drop-shadow-none'>
                      <span>Free Download</span>
                      <FaChevronDown className="w-5 h-5 ml-2 font-bold" />
                    </button>
                  </div>
                  <div className='mx-5'>
                    <button
                      className='font-montserrat drop-shadow-lg font-semibold tracking-wider text-sm lg:text-base bg-secondary3 hover:opacity-90 text-gray100 w-full h-11 inline-flex items-center justify-center hover:drop-shadow-none'>
                      <span>Save to Collection</span>
                      <FaRegBookmark className="w-5 h-5 ml-2 font-bold" />
                    </button>
                  </div>
                </div>
              </div>


              <div className='grid grid-rows-2'>
                <h1 className='font-rockwell text-2xl mt-16 ml-5'>More like this</h1>

                <hr className='text-[#AAAAAA] mt-5' />

                <div className='m-5'>
                  {/* <ResponsiveMasonry
                  style={{height: '300px'}}
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                  >
                    <Masonry  gutter="20px">
                      {null}

                      {
                        relatedPhotos?.photos?.map((photo, index) => (
                          <Link key={index} to={`/photo/detail/${photo.id}`}>
                            <img
                              alt="masonryPhotos"
                              src={photo.src.large}
                            // src={photo.download_url}
                            />
                          </Link>
                        ))
                      }
                    </Masonry>
                  </ResponsiveMasonry> */}
                </div>
              </div>

            </div>
          </div>
        </div>
      }
    </>

  )
}

export default DetailView