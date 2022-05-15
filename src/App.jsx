import { BrowserRouter, Routes, Route } from "react-router-dom";
//auth
import { SignIn } from "./views/Auth/SignIn";
import { SignUp } from "./views/Auth/SignUp";

import { BaseViewFrame } from "./views/BaseViewFrame";
import { Home } from "./views/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseViewFrame></BaseViewFrame>}>
            <Route index element={<Home></Home>}></Route>
          </Route>
          <Route path="/signIn" element={<SignIn></SignIn>}></Route>
          <Route path="/signUp" element={<SignUp></SignUp>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
