import React, { useEffect } from "react";
import Explore from "../Explore/Explore";
import { Loader } from "../../components";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotos, fetchNextPhotos, removeSelectedOrientation, removeSelectedCatagory } from "../../features/photo/photoSlice";
// THRID LIBARIES
import 'react-lazy-load-image-component/src/effects/blur.css';
import InfiniteMansory from "../../components/InfiniteMansory/InfiniteMansory";

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
            <InfiniteMansory datas={photos} path={'photo'} nextData={fetchNextPhotos()} />
          </div>
        )}
      </div>
    </>
  );
};

export default ExplorePhoto;
