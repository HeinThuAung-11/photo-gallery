import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVideoDetail,
  getVideoDetail,
} from "../../features/video/videoSlice";
import { VideoPlayer } from "./VideoPlayer";
import { IoLinkSharp } from "react-icons/io5";
import { DownloadVideo } from "./DownloadVideo";
import { MoreVideo } from "./MoreVideo";
import Loader from "../../components/Loader/Loader";

export const VideoDetail = () => {
  let { videoId } = useParams();
  const dispatch = useDispatch();
  const video = useSelector(getVideoDetail);

  useEffect(() => {
    console.log("Its me useeffect");
    dispatch(fetchVideoDetail(videoId));
  }, [dispatch, videoId]);
  console.log("video", video);
  if (Object.keys(video).length === 0) {
    return (
      <div className="mx-auto mt-60">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <hr className="text-[#AAAAAA] mt-2" />
      <div className={"mx-auto mt-14"}>
        <div className={"grid grid-cols-1 gap-10 lg:grid-cols-2"}>
          {video?.id ? <VideoPlayer video={video} /> : null}

          <div className={"w-full"}>
            <h1 className="font-rockwell text-2xl m-5 lg:mt-0 tracking-wide">
              {video?.user?.name}'s video
            </h1>
            <h1 className="font-montserrat font-normal m-5">
              <hr className="text-[#AAAAAA] my-5" />
              <span className="font-bold">Video Uploader</span>: &nbsp;
              <a
                href={video?.user?.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center hover:opacity-80"
              >
                {video?.user?.name}
                <IoLinkSharp className="w-6 h-6 ml-1 " />
              </a>
            </h1>
            <DownloadVideo vid={video.id} video={video} />
            <MoreVideo />
          </div>
        </div>
      </div>
    </>
  );
};
