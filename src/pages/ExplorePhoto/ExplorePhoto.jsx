import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Explore from "../Explore/Explore";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotos, fetchNextPhotos, removeSelectedOrientation, removeSelectedCatagory } from "../../features/photo/photoSlice";
import { Loader } from "../../components";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import InfiniteScroll from "react-infinite-scroll-component";

const ExplorePhoto = () => {
  const { photos, photoLoading } = useSelector((store) => store.photos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeSelectedCatagory())
    dispatch(removeSelectedOrientation())
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <>
      <Explore />
      <div>
        {photoLoading ? (
          <div className="mt-52">
            <Loader />
          </div>
        ) : (
          <div className="mx-[8vw] lg:mx-[15vw] mt-10 ">
            <InfiniteScroll
              dataLength={Array.isArray(photos) ? photos.length : null}
              next={() => dispatch(fetchNextPhotos())}
              hasMore={true}
              loader={<div className="overflow-hidden"><Loader /></div>}
            >
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              >
                <Masonry gutter="20px">
                  {Array.isArray(photos) ? (
                    photos?.map((photo, index) => (
                      <Link
                        key={index}
                        to={`/photo/detail/${photo.id}`}
                        className='mx-auto'>
                        <LazyLoadImage
                          effect="blur"
                          alt="masonryPhotos"
                          src={photo.src.large}
                          placeholderSrc='https://via.placeholder.com/240'
                        />
                      </Link>
                    ))
                  ) : (
                    <Loader />
                  )}
                </Masonry>
              </ResponsiveMasonry>
            </InfiniteScroll>
          </div>
        )}
      </div>
    </>
  );
};

export default ExplorePhoto;
