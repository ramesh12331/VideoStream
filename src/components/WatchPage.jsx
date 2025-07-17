import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeMenu } from "../utils/appSlice";

const WatchPage = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  //   console.log(searchParams.get("v"));
  return (
    <div className="mx-auto mt-14 pt-4 px-4 w-[83%]">
      <iframe
        className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:w-[800px] lg:h-[450px] xl:w-[950px] xl:h-[500px] shadow-lg"
        src={"https://www.youtube.com/embed/" + searchParams.get("v")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default WatchPage;
