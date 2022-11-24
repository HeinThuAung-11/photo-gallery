/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useMediaQuery } from 'react-responsive'
import Loader from '../Loader/Loader'
import { IoLinkSharp } from "react-icons/io5";
import { FaRegBookmark, FaChevronRight } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRelatedPhotos } from '../../features/photo/photoSlice';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from 'react-router-dom';



const DetailView = ({ photoDetailInfo, photoLoading }) => {
  const dispatch = useDispatch();
  const [buttonDisable, setButtonDisable] = useState(false)
  const { relatedPhotos } = useSelector(store => store.photos);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  useEffect(() => {
    dispatch(fetchRelatedPhotos(photoDetailInfo.avg_color))
  }, [dispatch, photoDetailInfo.avg_color])

  console.log(relatedPhotos)

  const handleDownload = (url, id) => {
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      console.log(response)
      setButtonDisable(true)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${id}_from_pexel.jpeg`);
      document.body.appendChild(link);
      link.click();
    })
  }

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

              <div className='grid grid-rows-2 overflow-auto'>
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
                    <div className="dropdown dropdown-right dropdown-end w-full">
                      <label tabIndex={0} className="">
                        <button
                          className='font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-primary2 hover:opacity-90 text-gray100 drop-shadow-lg w-full h-11 inline-flex items-center justify-center hover:drop-shadow-none'>
                          <span>Free Download</span>
                          <FaChevronRight className="w-3 h-3 lg:w-5 lg:h-5 ml-2" />
                        </button>
                        <ul tabIndex={0} className="dropdown-content menu p-2 drop-shadow-lg text-gray100 font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-primary2 w-52">
                          <li>
                            <a className='remove-active-dropdown'>
                              <button
                                disabled={buttonDisable}
                                onClick={() => handleDownload(photoDetailInfo?.src?.original, photoDetailInfo.id)}>
                                Original
                              </button>
                            </a>
                          </li>
                          <li>
                            <a className='remove-active-dropdown'>
                              <button
                                disabled={buttonDisable}
                                onClick={() => handleDownload(photoDetailInfo?.src?.large, photoDetailInfo.id)}>
                                Large
                              </button>
                            </a>
                          </li>
                          <li>
                            <a className='remove-active-dropdown'>
                              <button
                                disabled={buttonDisable}
                                onClick={() => handleDownload(photoDetailInfo?.src?.medium, photoDetailInfo.id)}>
                                Medium
                              </button>
                            </a>
                          </li>
                          <li>
                            <a className='remove-active-dropdown'>
                              <button
                                disabled={buttonDisable}
                                onClick={() => handleDownload(photoDetailInfo?.src?.small, photoDetailInfo.id)}>
                                Small
                              </button>
                            </a>
                          </li>
                        </ul>
                      </label>
                    </div>
                  </div>
                  <div className='mx-5'>
                    <button
                      className='font-montserrat drop-shadow-lg font-semibold tracking-wider text-xs lg:text-base bg-secondary3 hover:opacity-90 text-gray100 w-full h-11 inline-flex items-center justify-center hover:drop-shadow-none'>
                      <span>Save to Collection</span>
                      <FaRegBookmark className="w-3 h-3 lg:w-5 lg:h-5 ml-2" />
                    </button>

                  </div>
                </div>
              </div>


              <div className='grid grid-rows-2'>
                <h1 className='font-rockwell text-2xl mt-16 ml-5'>More like this</h1>

                <hr className='text-[#AAAAAA] mt-5' />

                <div className='overflow-auto'>
                  <ResponsiveMasonry
                    style={{ height: '400px' }}
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                  >
                    <Masonry gutter="20px">
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
                  </ResponsiveMasonry>
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