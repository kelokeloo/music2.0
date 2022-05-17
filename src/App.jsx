import { BrowserRouter, Routes, Route } from "react-router-dom";
import classes from "./App.module.scss";
//auth
import { SignIn } from "./views/Auth/SignIn";
import { SignUp } from "./views/Auth/SignUp";
import { RequireAuth } from "./components/Auth/RequireAuth";

import { BaseViewFrame } from "./views/BaseViewFrame";
import { Home } from "./views/Home";

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
          </Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
