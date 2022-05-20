import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import classes from "./App.module.scss";
//auth
import { SignIn } from "./views/Auth/SignIn";
import { SignUp } from "./views/Auth/SignUp";
import { RequireAuth } from "./components/Auth/RequireAuth";

import { BaseViewFrame } from "./views/BaseViewFrame";
import { Home } from "./views/Home";
import { Album } from "./views/Album";
import { Category } from "./views/Category";
import { Search } from "./views/Search";
import { ChatList } from "./views/Chat/ChatList";
import { Dialog } from "./views/Chat/Dialog";

function App() {
  return (
    <div className={classes.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseViewFrame></BaseViewFrame>}>
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="album"
              element={
                <RequireAuth>
                  <Outlet></Outlet>
                </RequireAuth>
              }
            >
              <Route path=":albumId" element={<Album></Album>}></Route>
            </Route>
            <Route
              path="navigate"
              element={
                <RequireAuth>
                  <Category></Category>
                </RequireAuth>
              }
            ></Route>
            <Route
              path="search"
              element={
                <RequireAuth>
                  <Search></Search>
                </RequireAuth>
              }
            ></Route>
            <Route
              path="chatlist"
              element={
                <RequireAuth>
                  <ChatList></ChatList>
                </RequireAuth>
              }
            ></Route>
            <Route
              path="dialog/:fromId"
              element={
                <RequireAuth>
                  <Dialog></Dialog>
                </RequireAuth>
              }
            ></Route>
          </Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
