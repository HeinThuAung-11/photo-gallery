export const VideoPlayer = ({ video }) => {
  let videolink = video?.video_files[0].link;
  return (
    <div className={"m-auto"}>
      <video className="w-[90%] h-[80vh] mx-auto" controls autoPlay>
        <source src={videolink} type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video>
    </div>
  );
};
