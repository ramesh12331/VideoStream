// import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
// import { CiSearch } from "react-icons/ci";
// import { IoMdMic } from "react-icons/io";
// import { RiVideoAddLine } from "react-icons/ri";

// // import ThemeToggleButton from "./ThemeToggleButton";

// import { IoSearch } from "react-icons/io5";
// import { useDispatch } from "react-redux";
// import { toggleMenu } from "../utils/appSlice";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { YOUTUBE_SEARCH_API } from "../utils/constants";

// const Head = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestion, setSuggestion] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   // console.log(searchQuery);

//   useEffect(() => {
//     // make an api call after every key press
//     // but if the differen 2 APi calls is <200ms
//     // decline the API call

//     const timer = setTimeout(() => getSearchSuggestions(), 200);

//     return () => {
//       clearTimeout(timer);
//     };
//     // getSearchSuggestions()
//   }, [searchQuery]);

//   const getSearchSuggestions = async () => {
//     // console.log("API CALL" + searchQuery)
//     const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
//     const json = await data.json();
//     // console.log(json[1]);
//     setSuggestion(json[1]);
//   };

//   const dispatch = useDispatch();

//   const toggleMenuHandler = () => {
//     dispatch(toggleMenu());
//   };
//   return (
//     <div className="flex bg-white justify-between px-6 py-2 shadow-lg dark:bg-gray-900 text-black dark:text-white fixed top-0 left-0 right-0 z-50">
//       {/* Left - Menu & Logo */}
//       <div className="flex items-center space-x-4">
//         <AiOutlineMenu
//           onClick={toggleMenuHandler}
//           className="text-xl cursor-pointer"
//         />
//         <Link to="/">
//           <img
//             className="w-20 dark:bg-white rounded-lg"
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1024px-Logo_of_YouTube_%282015-2017%29.svg.png"
//             alt="YouTube Logo"
//           />
//         </Link>
//       </div>

//       {/* Center - Search Bar */}
//       <div className="flex max-w-[600px] mx-4 relative ">
//         <div className="w-full px-3 py-2 border rounded-l-full bg-white dark:bg-gray-700">
//           <input
//             type="text"
//             placeholder="Search"
//             className="outline-none bg-transparent w-full text-black dark:text-white"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onFocus={() => setShowSuggestions(false)}
//             onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
//           />
//         </div>
//         <button className="px-4 py-2 border rounded-r-full bg-gray-100 dark:bg-green-600">
//           <CiSearch className="font-extrabold" />
//         </button>

//         {/* Suggestions Dropdown */}
//         {/* {showSuggestions && suggestion.length > 0 && (
//           <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-1 z-50">
//             {suggestion.map((s) => (
//               <li
//                 key={s}
//                 className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//                 onMouseDown={() => navigate(`/search?q=${s}`)}
//               >
//                 <IoSearch /> {s}
//               </li>
//             ))}
//           </ul>
//         )} */}

//         {showSuggestions && suggestion.length > 0 && (
//           <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-1 z-50">
//             {suggestion.map((s) => (
//               <li
//                 key={s}
//                 className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//                 onMouseDown={() => navigate(`/search?q=${s}`)}
//               >
//                 <IoSearch /> {s}
//               </li>
//             ))}
//           </ul>
//         )}

//         <IoMdMic
//           size={"42px"}
//           className="ml-3 rounded-full p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 duration-200 hidden md:flex"
//         />
//       </div>

//       {/* Right - Icons & Theme */}
//       <div className="flex space-x-5 items-center">
//         <RiVideoAddLine className="text-2xl hidden md:block" />
//         <AiOutlineBell className="text-2xl hidden md:block" />
//         <img
//           className="w-6 dark:bg-white rounded-full hidden md:flex"
//           src="https://static.thenounproject.com/png/1122811-200.png"
//           alt="User Avatar"
//         />
//         {/* <ThemeToggleButton /> */}
//       </div>
//     </div>
//   );
// };

// export default Head;

// *****************

import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
// import ThemeToggleButton from "./ThemeToggleButton";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState(""); //Search Query
  const [suggestion, setSuggestion] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (searchQuery) getSearchSuggestions();
  //   }, 200);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setShowSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await data.json();
      setSuggestion(json[1]);
      // update cache
      dispatch(cacheResults({ [searchQuery]: json[1] }));
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="flex justify-between px-6 py-2 shadow-lg dark:bg-gray-900 text-black dark:text-white fixed top-0 left-0 right-0 z-50">
      {/* Left - Menu & Logo */}
      <div className="flex items-center space-x-4">
        <AiOutlineMenu
          onClick={toggleMenuHandler}
          className="text-xl cursor-pointer"
        />
        <Link to="/">
          <img
            className="w-20 dark:bg-white rounded-lg"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1024px-Logo_of_YouTube_%282015-2017%29.svg.png"
            alt="YouTube Logo"
          />
        </Link>
      </div>

      {/* Center - Search Bar */}
      <div className="flex w-full md:max-w-[600px] mx-4 relative">
        <div className="w-full px-3 py-2 border rounded-l-full bg-white dark:bg-gray-700">
          <input
            type="text"
            placeholder="Search"
            className="outline-none bg-transparent w-full text-black dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          />
        </div>
        <button
          className="px-4 py-2 border rounded-r-full bg-gray-100 dark:bg-green-600"
          onClick={handleSearch}
        >
          <CiSearch className="font-extrabold" />
        </button>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestion.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-1 z-50">
            {suggestion.map((s) => (
              <li
                key={s}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onMouseDown={() => navigate(`/search?q=${s}`)}
              >
                <IoSearch /> {s}
              </li>
            ))}
          </ul>
        )}

        <IoMdMic
          size={"42px"}
          className="ml-3 rounded-full p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 duration-200 hidden md:flex"
        />
      </div>

      {/* Right - Icons & Theme */}
      <div className="flex space-x-5 items-center">
        <RiVideoAddLine className="text-2xl hidden md:block" />
        <AiOutlineBell className="text-2xl hidden md:block" />
        <img
          className="w-6 dark:bg-white rounded-full hidden md:flex"
          src="https://static.thenounproject.com/png/1122811-200.png"
          alt="User Avatar"
        />
        {/* <ThemeToggleButton /> */}
      </div>
    </div>
  );
};

export default Head;
