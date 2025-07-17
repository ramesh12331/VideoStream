import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { YOUTUBE_VIDEO_API } from "../utils/constants";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos,setVideos] = useState([])

  useEffect(()=>{
    getVideos()
  },[])

  const getVideos = async() =>{
    const data = await fetch(YOUTUBE_VIDEO_API);
    const json = await data.json();
    console.log(json.items);
    setVideos(json.items)
  }
  // getVideos()
  return (
    <div className="flex max-h-screen overflow-y-scroll scrollbar-hide flex-wrap gap-4 pt-2 justify-center">
      {/* Video Container */}
      {videos.map((video)=>(
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
