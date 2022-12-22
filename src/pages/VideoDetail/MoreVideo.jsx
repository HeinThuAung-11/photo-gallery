import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRelatedVideo,
  getRelatedVideo,
} from "../../features/video/videoSlice";
import { useEffect } from "react";

export const MoreVideo = () => {
  const relatedVideos = useSelector(getRelatedVideo);
  const dispatch = useDispatch();

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  }

  useEffect(() => {
    dispatch(fetchRelatedVideo());
  }, [dispatch]);

  return (
    <div>
      <h1 className="font-rockwell text-2xl mt-16 ml-5">More like this</h1>

      <hr className="text-[#AAAAAA] mt-5" />

      <div className="overflow-auto mt-14 related-photo">
        <ResponsiveMasonry
          style={{ height: "400px" }}
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
          <Masonry gutter="20px">
            {null}
            {relatedVideos?.map((video) => {
              return (
                <Link
                  key={video.id}
                  to={`/video/detail/${video.id}`}
                  className="mx-auto"
                  onClick={refreshPage}
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
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};
