import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Explore from '../Explore/Explore'
import { Loader } from '../../components'
import NoResult from '../../assets/images/NoResult.svg'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { fetchSearchPhoto } from '../../features/photo/photoSlice'
import { fetchMoreVideo, getSearchVideo, getSearchVideoResult } from "../../features/video/videoSlice";
// THRID LIBARIES
import { HiOutlineHome } from "react-icons/hi";
import InfiniteScroll from 'react-infinite-scroll-component'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

export const SearchVideos = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const videos = useSelector(getSearchVideo)
    const searchVideoResult = useSelector(getSearchVideoResult)
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

                {
                    searchVideoResult === 0 ?
                        <>
                            {noResult()}
                        </>
                        :
                        <InfiniteScroll
                            dataLength={videos ? videos.length : null}
                            next={() => dispatch(fetchMoreVideo())}
                            hasMore={true}
                            loader={<div className="overflow-hidden"><Loader /></div>}>
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                            ><Masonry gutter="20px">
                                    {null}
                                    {videos ? videos.map(vd => {
                                        return <Link key={vd.id} to={`/video/detail/${vd.id}`}>
                                            <div className="lightboxContainer cursor-pointer" >
                                                <LazyLoadImage
                                                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                                                    effect="blur"
                                                    alt="masonryPhotos"
                                                    src={vd.image}
                                                />
                                            </div>
                                        </Link>
                                    }) : null}
                                </Masonry></ResponsiveMasonry>
                        </InfiniteScroll>
                }
            </div>
        </>
    )
}

