import {UserNav} from "./UserNav";
import {UserProfile} from "./UserProfile";
import {useDispatch, useSelector} from "react-redux";
import {fetchFavouritePhotos, getFavouritePhotos} from "../../features/user/userSlice";
import {useAuth} from "../../utli/Auth";
import {useEffect} from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";


export const UserPhoto=({ photoId})=>{
    console.log('photoid',photoId)
    const dispatch = useDispatch();
    const favouritePhoto = useSelector(getFavouritePhotos)
    useEffect(()=>{
        if(photoId.length > 0){
            dispatch(fetchFavouritePhotos(photoId))
        }
    },[dispatch,photoId])
    return(<div>
        <div className='overflow-auto mt-5 px-[10vw]'>
            <ResponsiveMasonry
                style={{ height: '400px' }}
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
                <Masonry gutter="20px">
                    {null}
                    {
                        favouritePhoto?.map((photo) => {
                            return <Link
                                key={photo.id}
                                to={`/photo/detail/${photo.id}`}
                                className='mx-auto'
                           >
                                    <LazyLoadImage
                                        className="mx-auto"
                                        effect="blur"
                                        alt="masonryPhotos"
                                        src={photo.src.large}
                                    />

                            </Link>
                        })

                    }
                </Masonry>
            </ResponsiveMasonry>
        </div>
    </div>)
}