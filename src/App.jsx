import React, { useEffect, useState } from "react";
import Head from "./components/Head";
import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import { Route, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchResults from "./components/SearchResults";
import { ThemeProvider } from "./contexts/theme";

const App = () => {
const [themeMode, setThemeMode] = useState("light");

  const lightTheme = () => {
    setThemeMode("light");
  };
  const darkTheme = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
    <Provider store={store}>
    <div>
      <Routes>
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<MainContainer/>} />
          <Route path="/watch" element={<WatchPage/>}/>
          <Route path="/search" element={<SearchResults/>} />
        </Route>
      </Routes>
      {/* <Head/>
      <Body/> */}
    </div>
    </Provider>
    </ThemeProvider>
  );
};

export default App;
