import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Explore from '../Explore/Explore'
import {fetchMoreVideo, fetchPopularVideo, getPopularVideo} from "../../features/video/videoSlice";
import './ExploreVideo.css'
import { Link } from "react-router-dom";
import { Loader } from "../../components";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import InfiniteScroll from "react-infinite-scroll-component";

const ExploreVideo = () => {
    const videos = useSelector(getPopularVideo);
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log('useeffect')
        dispatch(fetchPopularVideo())
    }, [dispatch])
    console.log('videos',videos)

    return (
        <>
            <Explore />
            <div className="mx-[8vw] lg:mx-[15vw] mt-10 ">
                <InfiniteScroll
                    dataLength={videos ? videos.length : null} //This is important field to render the next data
                    next={()=>dispatch(fetchMoreVideo())}
                    hasMore={true}
                    loader={<div className="overflow-hidden"><Loader /></div>}>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                    ><Masonry gutter="20px">
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
            </div>
        </>
    )
}

export default ExploreVideo