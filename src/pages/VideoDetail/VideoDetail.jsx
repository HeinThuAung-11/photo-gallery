import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {fetchPopularVideo, fetchVideoDetail, getVideoDetail, selectVideoById} from "../../features/video/videoSlice";
import {VideoPlayer} from "./VideoPlayer";
import {IoLinkSharp} from "react-icons/io5";
import {FaChevronRight, FaRegBookmark} from "react-icons/fa";
import {DownloadVideo} from "./DownloadVideo";
import {MoreVideo} from "./MoreVideo";

export const VideoDetail=()=>{
    let {videoId} = useParams();
    const dispatch = useDispatch()
    const video = useSelector(getVideoDetail)

    useEffect(()=>{
        console.log("Its me useeffect")
        dispatch(fetchVideoDetail(videoId))
    },[])
    console.log("vidoes",video)
    return(<div className={'container mx-auto mt-5'} >

        <div className={'flex gap-10'}>
            {video?.id ? <VideoPlayer video={video}/> :null}

            <div className={'flex flex-col w-1/2'}>
                <h1 className='font-rockwell text-2xl m-5 lg:mt-0 tracking-wide'>{video.user.name}</h1>
                <h1 className='font-montserrat font-normal m-5'>

                    <hr className='text-[#AAAAAA] my-5' />
                    <span className='font-bold'>Video Uploader</span>: &nbsp;
                    <a href={video.user.url}
                       target='_blank'
                       rel="noreferrer"
                       className='inline-flex items-center hover:opacity-80'>
                        {video.user.name}
                        <IoLinkSharp className="w-6 h-6 ml-1 " />
                    </a>
                </h1>
               <DownloadVideo/>
                <MoreVideo/>
            </div>

        </div>

    </div>)
}