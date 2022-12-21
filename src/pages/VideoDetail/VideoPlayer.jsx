export const VideoPlayer = ({ video }) => {
  let videolink = video?.video_files[0].link;
  return (
    <div className={"m-auto"}>
      <video className="w-full h-[80vh]" controls autoPlay>
        <source src={videolink} type="video/mp4" />
        Sorry, your browser doesn't support videos.
      </video>
    </div>
  );
};
