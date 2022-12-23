import React, { useEffect } from 'react'
import Explore from '../Explore/Explore'
import './ExploreVideo.css'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoreVideo, fetchPopularVideo, getPopularVideo } from "../../features/video/videoSlice";
// THRID LIBARIES
import InfiniteMansory from '../../components/InfiniteMansory/InfiniteMansory';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ExploreVideo = () => {
    const videos = useSelector(getPopularVideo);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPopularVideo())
    }, [dispatch])

    return (
        <>
            <Explore />
            <div className="mx-[8vw] lg:mx-[15vw] mt-10 ">
                <InfiniteMansory
                    datas={videos}
                    path={'video'}
                    nextData={fetchMoreVideo()}
                    cssProperty={'lightboxContainer'} />
            </div>
        </>
    )
}

export default ExploreVideo