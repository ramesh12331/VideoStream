import React from "react";
import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import Head from "./Head";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <>
      <Head />
      <div className="flex gap-4 dark:bg-blue-300/20">
        <Sidebar />
        <Outlet />
        {/* <MainContainer/> */}
      </div>
    </>
  );
};

export default Body;
