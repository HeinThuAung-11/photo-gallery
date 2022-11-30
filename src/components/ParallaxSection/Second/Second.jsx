import React from "react";
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";
import tree from "../../../assets/tree.jpg";
import "./Second.css";

const Second = () => {
  return (
    <Parallax
      className="image2"
      blur={0}
      bgImage={tree}
      strength={500}
      bgImageStyle={{ minHeight: "100vh", objectFit: "cover" }}
    >
      <div className="content2">
        <div className="center2">
          <h2 className="font-rockwell font-medium text-3xl lg:text-4xl text-gray100 tracking-wide">
            Explore
          </h2>
          <h2 className="font-rockwell font-semibold text-4xl lg:text-5xl text-gray100 tracking-widest mt-3">
            Photos
          </h2>
          <p className="font-montserrat text-lg lg:text-xl tracking-wide mt-5 text-gray100">
            Explore and download breathtaking
            <br />
            photos.
          </p>
          <Link to="/explore/photos">
            <button className="home-button font-rockwell font-bold text-lg lg:text-xl tracking-wider w-[70%] h-[70px] lg:h-[60px] text-gray900 mt-5  px-4  bg-secondary2 hover:bg-secondary1 hover:drop-shadow-none">
              Discover Photos
            </button>
          </Link>
        </div>
      </div>
    </Parallax>
  );
};

export default Second;
