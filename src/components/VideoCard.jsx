import React from "react";

const VideoCard = ({ info }) => {
  // if(!info) return null;
  // // console.log(info);
  // const { snippet,statistics } = info;
  // const { channelTitle,thumbnails,title } = snippet;

  if (!info || !info.snippet) return null;

  // console.log(info);
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  return (
    <div>
      <div
        className="card bg-base-100 w-56  dark:bg-gray-900 text-black dark:text-white shadow-2xl 
      hover:shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer
      "
      >
        <figure>
          <img src={thumbnails.medium.url} alt="Shoes" />
        </figure>
        <div className="p-2  w-full max-w-xs">
          {/* <h2 className="card-title font-bold truncate">{title}</h2> */}
          <h2 className="card-title font-bold truncate w-full overflow-hidden whitespace-nowrap">
            {title.length > 50 ? title.slice(0, 20) + "..." : title}
          </h2>
          <ul>
            <li className="text-sm text-gray-500 truncate">
              🚀 : Akshay Saini
            </li>
            <li className="text-sm text-gray-500 flex">
              👁️‍🗨️ : {statistics.viewCount}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
