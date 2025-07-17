import React from "react";
import Head from "./components/Head";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import { Route, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";

const App = () => {
  return (
    <Provider store={store}>
    <div>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<MainContainer/>} />
          <Route path="/watch" element={<WatchPage/>}/>
        </Route>
      </Routes>
      {/* <Head/>
      <Body/> */}
    </div>
    </Provider>
  );
};

export default App;
