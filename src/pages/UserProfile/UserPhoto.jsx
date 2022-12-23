import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// FIREBASE
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavouritePhotos,
  getAllData,
  getFavouritePhotos,
} from "../../features/user/userSlice";
// THIRD PARTIES
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaTrashAlt } from "react-icons/fa";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { removePhotoCollection } from "./RemoveCollection";
import { ClockLoader } from "react-spinners";

export const UserPhoto = ({ photoId, userId }) => {
  const dispatch = useDispatch();
  const favouritePhoto = useSelector(getFavouritePhotos);
  const [buttonLoading, setButtonLoading] = useState()

  useEffect(() => {
    dispatch(fetchFavouritePhotos(photoId));
  }, [dispatch, photoId]);

  const removeFunction = (userId, photoId) => {
    setButtonLoading(true)
    setTimeout(() => {
      removePhotoCollection(userId, photoId);
      dispatch(getAllData(userId));
      setButtonLoading(false)
    }, 2000);

  }

  return (
    <div>
      <div className="overflow-auto mt-5 px-[10vw] related-photo">
        {favouritePhoto === undefined ?
          <h1 className="font-montserrat text-center text-3xl mt-5">Empty Photo Collection.</h1>
          :
          <ResponsiveMasonry
            className="h-96 lg:h-[91vh]"
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="20px">
              {null}
              {favouritePhoto?.map((photo) => {
                return (

                  <div key={photo.id} className="relative mx-auto">
                    {buttonLoading ?
                      <button
                        className="loginBox btn no-animation btn-error absolute z-10 top-3 right-3 hover:shadow-none hover:opacity-90"
                      >
                        <ClockLoader
                          color="#000000"
                          size={20}
                        />
                      </button>
                      :
                      <button
                        className="loginBox btn btn-error absolute z-10 top-3 right-3 hover:shadow-none hover:opacity-90"
                        onClick={() => removeFunction(userId, photo.id)}
                      >
                        <FaTrashAlt className="w-3 lg:w-4 h-3 lg:h-4" />
                      </button>
                    }
                    <Link
                      key={photo.id}
                      to={`/photo/detail/${photo.id}`}
                      className="mx-auto"
                    >
                      <LazyLoadImage
                        className="mx-auto relative"
                        effect="blur"
                        alt="masonryPhotos"
                        src={photo.src.large}
                      />
                    </Link>
                  </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        }
      </div>
    </div>
  );
};
