import { Outlet } from "react-router-dom";
import classes from "./index.module.scss";
export function BaseViewFrame() {
  return (
    <div className={classes.box}>
      <Outlet></Outlet>
    </div>
  );
}
