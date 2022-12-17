import { useEffect } from "react";
import { Link } from "react-router-dom";
// FIREBASE
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utli/firebase";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchFavouritePhotos, getFavouritePhotos } from "../../features/user/userSlice";
// THIRD PARTIES
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaTrashAlt } from "react-icons/fa";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


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
                                        <FaTrashAlt className="w-3 lg:w-4 h-3 lg:h-4" />
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