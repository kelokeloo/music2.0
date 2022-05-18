import { Outlet } from "react-router-dom";
import classes from "./index.module.scss";
import { Tab } from "../../components/Tab";
import { MiniPlayer } from "../../components/MiniPlayer";
import { Player } from "../../components/Player";
import { PlayerContext } from "../../../Context/PlayerContext";
import { useState } from "react";

export function BaseViewFrame() {
  const [playerDisable, setPlayerDisable] = useState(false);
  function showPlayer() {
    setPlayerDisable(true);
  }
  function hiddenPlayer() {
    setPlayerDisable(false);
  }
  return (
    <div className={classes.box}>
      <PlayerContext>
        <Outlet></Outlet>
        <MiniPlayer showPlayer={showPlayer}></MiniPlayer>
        <Tab></Tab>
        <Player show={playerDisable} hiddenPlayer={hiddenPlayer}></Player>
      </PlayerContext>
    </div>
  );
}
