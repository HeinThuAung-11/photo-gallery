import Vimeo from '@u-wave/react-vimeo';
import {type} from "@testing-library/user-event/dist/type";
import ReactPlayer from "react-player";
export const VideoPlayer=({video})=>{
    let videolink = video?.video_files[0].link;
   // console.log('videoplayer',video)
    return <div className={'w-1/2'}>
        <iframe src={videolink} width="100%"
                height="500px" frameBorder="0" webkitallowfullscreen={"true"} mozallowfullscreen={"true"}
                allowFullScreen></iframe>
    </div>
}