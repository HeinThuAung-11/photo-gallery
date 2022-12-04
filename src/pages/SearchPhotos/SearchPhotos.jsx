import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Explore from '../Explore/Explore'
import { Loader } from '../../components'
import { useSelector } from 'react-redux'
import NoResult from '../../assets/NoResult.svg'
import { HiOutlineHome } from "react-icons/hi";
import { fetchNextSearchPhotos, fetchSearchPhoto } from '../../features/photo/photoSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom'

const SearchPhotos
 = () => {
    const { photoLoading, searchPhotos } = useSelector((store) => store.photos)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // console.log(photoLoading)

    useEffect(() => {
        dispatch(fetchSearchPhoto())
    }, [dispatch])


    const noResult = () => {
        return (
            <div className='mx-auto'>
                <div className='notfound-center text-center mt-32'>
                    <img src={NoResult} alt="noresult_svg" />
                    <p className='font-montserrat font-semibold text-xl lg:text-2xl'>
                        Please try another search.
                    </p>
                    <button onClick={() => navigate('/')} className="font-montserrat py-2 px-8 lg:py-3 lg:px-9  inline-flex items-center mt-10 bg-primary1 hover:bg-primary2 shadow-[4px_4px_4px_rgba(0,0,0,0.3)] hover:shadow-none">
                        <span className='font-bold text-sm lg:text-lg'>Go Home</span>
                        <HiOutlineHome className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        )
    }


    return (
        <>
            <Explore />
            <div className="mx-[8vw] lg:mx-[15vw] mt-10">
                {photoLoading ?
                    <div>
                        <Loader />
                    </div>
                    :
                    <>
                        {
                            searchPhotos.total_results === 0 ?
                                <>
                                    {noResult()}
                                </>
                                :
                                <InfiniteScroll
                                    dataLength={Array.isArray(searchPhotos.photos) ? searchPhotos.photos.length : null}
                                    next={() => dispatch(fetchNextSearchPhotos())}
                                    hasMore={true}
                                    loader={<div className="overflow-hidden"><Loader /></div>}
                                >
                                    <ResponsiveMasonry
                                        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                                    >
                                        <Masonry gutter="20px">
                                            {Array.isArray(searchPhotos.photos) ? (
                                                searchPhotos?.photos?.map((photo, index) => (
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
                                            ) : (
                                                <>
                                                    {noResult()}
                                                </>
                                            )}
                                        </Masonry>
                                    </ResponsiveMasonry>
                                </InfiniteScroll>
                        }
                    </>

                }

            </div>
        </>
    )
}

export default SearchPhotos
