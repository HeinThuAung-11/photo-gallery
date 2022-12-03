import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Explore from '../Explore/Explore'
import {fetchPopularVideo, getPopularVideo} from "../../features/video/videoSlice";
import './ExploreVideo.css'
import {Link} from "react-router-dom";
const ExploreVideo = () => {
    const video = useSelector(getPopularVideo)
    const dispatch = useDispatch();
    useEffect(() => {
        // console.log('useeffect')
        dispatch(fetchPopularVideo())
    }, [])
    // console.log('videos',video)
    return (
        <>
            <Explore />
            {video ? video.videos.map(vd=>{
                return <Link key={vd.id} to={`/video/detail/${vd.id}`}>
                    <div className="lightboxContainer cursor-pointer" >
                        <img src={vd.image} alt="video image"/>
                    </div>
                </Link>

            }): null}
        </>
    )
}

export default ExploreVideo