import Vimeo from '@u-wave/react-vimeo';
import {type} from "@testing-library/user-event/dist/type";
import ReactPlayer from "react-player";
export const VideoPlayer=({video})=>{
    let videolink = video?.video_files[0].link;
    console.log('videoplayer',videolink)
    return <div className={'w-1/2'}>
        <a href={videolink} target={'_blank'}>
            <div className="lightboxContainer cursor-pointer" >
                <img src={video.image} alt="video image"/>
            </div>
        </a>
    </div>
}