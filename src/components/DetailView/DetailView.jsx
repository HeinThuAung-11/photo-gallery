/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useMediaQuery } from 'react-responsive'
import Loader from '../Loader/Loader'
import { ClockLoader } from 'react-spinners';
import { IoLinkSharp, IoCloudDownloadSharp } from "react-icons/io5";
import { FaRegBookmark, FaChevronRight } from "react-icons/fa";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRelatedPhotos } from '../../features/photo/photoSlice';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../utli/Auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utli/firebase";
import Toast from '../Toast/Toast'


const DetailView = ({ photoDetailInfo, photoLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [downloadButtonLoading, setDownloadButtonLoading] = useState()
  const [collectionButtonLoading, setCollectionButtonLoading] = useState()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const { relatedPhotos } = useSelector(store => store.photos);
  const { currentUser } = useAuth();
  const dropDownData = {
    data: [
      {
        dropDownName: "Original",
        dropDownPath: photoDetailInfo?.src?.original,
      },
      {
        dropDownName: "Large",
        dropDownPath: photoDetailInfo?.src?.large,
      },
      {
        dropDownName: "Medium",
        dropDownPath: photoDetailInfo?.src?.medium,
      },
      {
        dropDownName: "Small",
        dropDownPath: photoDetailInfo?.src?.small,
      },
    ]
  }


  useEffect(() => {
    dispatch(fetchRelatedPhotos(photoDetailInfo.avg_color))
  }, [dispatch, photoDetailInfo.avg_color])


  const handleDownload = (url, id) => {
    axios({
      url: url,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      setDownloadButtonLoading(true)
      setTimeout(() => {
        Toast('success', "Downloaded!", false, 2000, "top-right", <IoCloudDownloadSharp />)
        setDownloadButtonLoading(false)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${id}_from_pexel.jpeg`);
        document.body.appendChild(link);
        link.click();
      }, 3000);

    })
  }

  const handleAddPhoto = () => {
    if (!currentUser) {
      navigate('/login')
    }
    const docRef = doc(db, "users", currentUser.uid);
    setCollectionButtonLoading(true)
    setTimeout(async () => {
      await updateDoc(docRef, {
        favourite_photo_id: arrayUnion(photoDetailInfo.id)
      })
      setCollectionButtonLoading(false)
      Toast('success', "Saved!", false, 2000, "top-right", <BsFillBookmarkCheckFill />)
    }, 3000);
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
            <div className={`w-full mb-10 p-4 ${isTabletOrMobile ? `text-center` : `text-right`}`}>
              {photoLoading ?
                <p className='text-3xl text-center'>
                  Loading...
                </p>
                :
                <>
                  <LazyLoadImage
                    effect='blur'
                    src={photoDetailInfo?.src?.large}
                    alt="photo_detail"
                    placeholderSrc='https://via.placeholder.com/240' />
                </>
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

                <div className='columns-2'>
                  <div className='mx-3'>
                    <div className="dropdown dropdown-right dropdown-end w-full">
                      <label tabIndex={0}>
                        {downloadButtonLoading ?
                          <button
                            className='font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-primary2 hover:opacity-90 text-gray100 drop-shadow-lg w-full h-11 px-4 inline-flex items-center justify-center hover:drop-shadow-none'>
                            <ClockLoader
                              color="#81a7c5"
                              size={25}
                            />
                          </button>
                          :
                          <>
                            <button
                              className='font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-primary2 hover:opacity-90 text-gray100 drop-shadow-lg w-full h-11 px-4 inline-flex items-center justify-center hover:drop-shadow-none'>
                              <span>Free Download</span>
                              <FaChevronRight className="w-3 h-3 lg:w-5 lg:h-5 ml-2" />
                            </button>
                            <ul tabIndex={0} className="dropdown-content menu p-2 drop-shadow-lg text-gray100 font-montserrat font-semibold tracking-wider text-xs lg:text-base bg-primary2 w-44 lg:w-52">
                              {dropDownData.data.map((data, index) => (
                                <li key={index}>
                                  <a className='remove-active-dropdown'
                                    onClick={() => handleDownload(data.dropDownPath, photoDetailInfo.id)}>
                                    <button>
                                      {downloadButtonLoading ?
                                        "Loading..."
                                        :
                                        data.dropDownName
                                      }
                                    </button>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </>
                        }
                      </label>
                    </div>
                  </div>
                  <div className='mx-3'>
                    <button
                      onClick={() => handleAddPhoto()}
                      className='font-montserrat drop-shadow-lg font-semibold tracking-wider text-xs lg:text-base bg-secondary3 hover:opacity-90 text-gray100 w-full h-11 px-4 inline-flex items-center justify-center hover:drop-shadow-none'>
                      {collectionButtonLoading ?
                        <ClockLoader
                          color="#E2C69A"
                          size={25}
                        />
                        :
                        <>
                          <span>Save to Collection</span>
                          <FaRegBookmark className="w-3 h-3 lg:w-5 lg:h-5 ml-2" />
                        </>
                      }
                    </button>
                  </div>
                </div>
              </div>


              <div className='grid grid-rows-2 p-4'>
                <h1 className='font-rockwell text-2xl mt-16 ml-5'>More like this</h1>

                <hr className='text-[#AAAAAA] mt-5' />

                <div style={{ height: '400px' }} className='overflow-auto related-photo'>
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                  >
                    <Masonry gutter="20px">
                      {null}
                      {
                        relatedPhotos?.photos?.map((photo, index) => (
                          <Link
                            key={index}
                            to={`/photo/detail/${photo.id}`}
                            className='mx-auto'>
                            <LazyLoadImage
                              effect="blur"
                              alt="masonryPhotos"
                              src={photo.src.large}
                              placeholderSrc='https://via.placeholder.com/240'
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