import Vimeo from '@u-wave/react-vimeo';
import { type } from "@testing-library/user-event/dist/type";
import ReactPlayer from "react-player";


export const VideoPlayer = ({ video }) => {
    let videolink = video?.video_files[0].link;
    // console.log('videoplayer',video)
    return (
        <div className={'w-1/2 m-auto'}>
            <video className='w-full h-[80vh]' controls autoPlay>
                <source src={videolink} type="video/mp4"
                />
                Sorry, your browser doesn't support videos.
            </video>
        </div>
    )
}