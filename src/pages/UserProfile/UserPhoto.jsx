import { UserNav } from "./UserNav";
import { UserProfile } from "./UserProfile";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavouritePhotos, getFavouritePhotos } from "../../features/user/userSlice";
import { useAuth } from "../../utli/Auth";
import { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { RemovePhotoCollection } from "./RemoveCollection";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utli/firebase";


export const UserPhoto = ({ photoId, userId }) => {
    const dispatch = useDispatch();
    const favouritePhoto = useSelector(getFavouritePhotos);
    useEffect(() => {
        if (photoId.length > 0) {
            dispatch(fetchFavouritePhotos(photoId))
        }
    }, [dispatch, photoId])

    const RemovePhotoCollection = async (userId, element) => {
        const docRef = doc(db, "users", userId);
        await updateDoc(docRef, {
            favourite_photo_id: arrayRemove(element)
        })
    }

    return (<div>
        <div className='overflow-auto mt-5 px-[10vw]'>
            <ResponsiveMasonry
                style={{ height: '400px' }}
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
                <Masonry gutter="20px">
                    {null}
                    {
                        favouritePhoto?.map((photo) => {
                            return (
                                <div key={photo.id} className='relative mx-auto'>
                                    <button
                                        className='loginBox btn btn-error absolute z-10 top-3 right-3 hover:shadow-none hover:opacity-90'
                                        onClick={() => RemovePhotoCollection(userId, photo.id)}>
                                        <FaTrashAlt className="w-4 h-4" />
                                    </button>
                                    <Link
                                        key={photo.id}
                                        to={`/photo/detail/${photo.id}`}
                                        className='mx-auto'
                                    >
                                        <LazyLoadImage
                                            className="mx-auto relative"
                                            effect="blur"
                                            alt="masonryPhotos"
                                            src={photo.src.large}
                                        />
                                    </Link>

                                </div>)
                        })

                    }
                </Masonry>
            </ResponsiveMasonry>
        </div>
    </div>)
}