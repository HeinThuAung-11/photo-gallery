import {UserNav} from "./UserNav";
import {UserProfile} from "./UserProfile";
import {fetchFavouriteVideos, getFavouriteVideos} from "../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";


export const UserVideo=({videoId})=>{
    const dispatch = useDispatch();
    const favouriteVideo = useSelector(getFavouriteVideos)
    useEffect(()=>{
        if(videoId.length > 0){
            dispatch(fetchFavouriteVideos(videoId))
        }
    },[dispatch,videoId])
    return(<div>

        <div className='overflow-auto mt-5 px-[10vw]'>
            <ResponsiveMasonry
                style={{ height: '400px' }}
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
                <Masonry gutter="20px">
                    {null}
                    {
                        favouriteVideo?.map((video) => {
                            return <Link
                                key={video.id}
                                to={`/video/detail/${video.id}`}
                                className='mx-auto'
                               >
                                <div className="lightboxContainer cursor-pointer">
                                    <LazyLoadImage
                                        className="mx-auto"
                                        effect="blur"
                                        alt="masonryPhotos"
                                        src={video.image}
                                    />
                                </div>
                            </Link>
                        })

                    }
                </Masonry>
            </ResponsiveMasonry>
        </div>
    </div>)
}