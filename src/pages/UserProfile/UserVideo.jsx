import { useEffect } from "react";
import { Link } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavouriteVideos,
  getAllData,
  getFavouriteVideos,
} from "../../features/user/userSlice";
// THIRD PARTIES
import { FaTrashAlt } from "react-icons/fa";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { removeVideoCollection } from "./RemoveCollection";

export const UserVideo = ({ videoId, userId }) => {
  const dispatch = useDispatch();
  const favouriteVideo = useSelector(getFavouriteVideos);
  useEffect(() => {
    dispatch(fetchFavouriteVideos(videoId));
  }, [dispatch, videoId]);
  return (
    <div>
      <div className="overflow-auto mt-5 px-[10vw]">
        <ResponsiveMasonry
          style={{ height: "400px" }}
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
          <Masonry gutter="20px">
            {null}
            {favouriteVideo?.map((video) => {
              return (
                <div key={video.id} className="relative mx-auto">
                  <button
                    className="loginBox btn btn-error absolute z-10 top-3 right-3 hover:shadow-none hover:opacity-90"
                    onClick={() => {
                      removeVideoCollection(userId, video.id);
                      dispatch(getAllData(userId));
                    }}
                  >
                    <FaTrashAlt className="w-3 lg:w-4 h-3 lg:h-4" />
                  </button>
                  <Link
                    key={video.id}
                    to={`/video/detail/${video.id}`}
                    className="mx-auto"
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
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};
