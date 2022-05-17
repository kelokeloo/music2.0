import { Outlet } from "react-router-dom";
import classes from "./index.module.scss";
import { Tab } from "../../components/Tab";
import { MiniPlayer } from "../../components/MiniPlayer";

export function BaseViewFrame() {
  return (
    <div className={classes.box}>
      <Outlet></Outlet>
      <MiniPlayer></MiniPlayer>
      <Tab></Tab>
    </div>
  );
}
