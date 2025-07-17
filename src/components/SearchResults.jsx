// import React from 'react'

// const SearchResults = () => {
//   return (
//     <div>
//       Videos
//     </div>
//   )
// }

// export default SearchResults

// ****************

// import { Link, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import VideoCard from "./VideoCard";
// import { YOUTUBE_VIDEO_API } from "../utils/constants";

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get("q");
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     fetchVideos();
//   }, [query]);

//   const fetchVideos = async () => {
//     // const data = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=YOUR_API_KEY`);
//     const data = await fetch(YOUTUBE_VIDEO_API + query);

//     const json = await data.json();
//     setVideos(json.items);
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
//       {videos.map((video) => (
//         // <VideoCard key={video.id.videoId} info={video} />
//         <Link key={video.id} >
//           <VideoCard info={video} />
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default SearchResults;

// ****************

import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import VideoCard from "./VideoCard";
// import { YOUTUBE_VIDEO_API } from "../utils/constants";
import VideoCardSearch from "./VideoCardSearch";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, [query]);

  //   const fetchVideos = async () => {
  //     try {
  //       //   const res = await fetch(YOUTUBE_VIDEO_API + query);
  //       const res = await fetch(
  //         `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyDtzwXIfZRUoikGs8ag8S-Q9g0y_Jpc7wM`
  //       );
  //       if (Array.isArray(json.items)) {
  //         setVideos(json.items);
  //       } else {
  //         setVideos([]);
  //       }
  //     } catch (err) {
  //       console.error("API error:", err);
  //       setVideos([]);
  //     }
  //   };

  const fetchVideos = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=${query}&key=AIzaSyDtzwXIfZRUoikGs8ag8S-Q9g0y_Jpc7wM`
      );
      const json = await res.json(); // ✅ this line was missing

      if (Array.isArray(json.items)) {
        setVideos(json.items);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.error("API error:", err);
      setVideos([]);
    }
  };

  return (
    <div className="flex flex-1 max-h-screen overflow-y-scroll scrollbar-hide w-[83%] flex-wrap gap-4 pt-2 justify-center mt-14">
      {Array.isArray(videos) &&
        videos
          .filter((video) => video?.id?.videoId)
          .map((video) => (
            <Link key={video.id.videoId} to={`/watch?v=${video.id.videoId}`}>
              <VideoCardSearch info={video} />
            </Link>
          ))}
    </div>
  );
};

export default SearchResults;
