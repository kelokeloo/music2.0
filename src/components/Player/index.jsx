import classes from "./index.module.scss";
import { useContext } from "react";
import { PlayerCtx } from "../../../Context/PlayerContext";
import { Prev } from "./Prev";
import { PlayerAndPause } from "./PlayerAndPause";
import { Next } from "./Next";
import { MusicInfo } from "./MusicInfo";
import { LikeIcon } from "./LikeIcon";
import { BackIcon } from "./BackIcon";

export function Player(props) {
  const { show, hiddenPlayer } = props;
  const { curMusic, curState, play, pause, next } = useContext(PlayerCtx);
  const { name, singer, lyrics, composer, arranger } = curMusic
    ? curMusic
    : { name: "", singer: "", lyrics: [], composer: [], arranger: [] };
  console.log("curMusic", curMusic);

  return (
    <div className={classes.box} style={{ top: show ? "0" : "100%" }}>
      <header onClick={() => hiddenPlayer()}>
        <BackIcon></BackIcon>
      </header>
      <div className={classes.img}>
        <img src="" />
      </div>
      <div className={classes.like}>
        <LikeIcon></LikeIcon>
      </div>
      <MusicInfo {...{ name, singer, lyrics, composer, arranger }}></MusicInfo>

      <div className={classes.control}>
        <Prev></Prev>
        <PlayerAndPause
          state={curState}
          play={play}
          pause={pause}
        ></PlayerAndPause>
        <Next next={next}></Next>
      </div>
    </div>
  );
}
