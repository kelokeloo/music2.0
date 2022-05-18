import classes from "./index.module.scss";
import { useContext } from "react";
import { PlayerCtx } from "../../../Context/PlayerContext";
import { Prev } from "./Prev";
import { PlayerAndPause } from "./PlayerAndPause";
import { Next } from "./Next";
import { MusicInfo } from "./MusicInfo";
import { LikeIcon } from "./LikeIcon";
import { BackIcon } from "./BackIcon";
import { useEffect, useState } from "react";
import {
  isUserLikeMusic,
  setUserLikeMusic,
  setUserDisLikeMusic,
} from "../../Api/common";

// 判断是否是喜欢的音乐
function useLikeMusic(curMusic, setLike) {
  useEffect(() => {
    if (!curMusic) return;
    const musicId = curMusic._id;
    const userId = sessionStorage.getItem("_id");
    async function fetch() {
      const res = await isUserLikeMusic(userId, musicId);
      const { code, data } = res;
      if (code !== -1) {
        const { like } = data;
        setLike(like);
      }
    }
    fetch();
  }, [curMusic]);
}

export function Player(props) {
  const { show, hiddenPlayer } = props;
  const { curMusic, curState, play, pause, next, prev } = useContext(PlayerCtx);
  const { name, singer, lyrics, composer, arranger, img } = curMusic
    ? curMusic
    : { name: "", singer: "", lyrics: [], composer: [], arranger: [] };
  const [like, setLike] = useState(false);
  useLikeMusic(curMusic, setLike);

  function handleLikeClick() {
    const musicId = curMusic._id;
    const userId = sessionStorage.getItem("_id");
    setLike((like) => {
      like = !like;
      like
        ? setUserLikeMusic(userId, musicId)
        : setUserDisLikeMusic(userId, musicId);
      return like;
    });
  }

  return (
    <div className={classes.box} style={{ top: show ? "0" : "100%" }}>
      <header onClick={() => hiddenPlayer()}>
        <BackIcon></BackIcon>
      </header>
      <div className={classes.img}>
        <img src={img} />
      </div>
      <div className={classes.like}>
        <LikeIcon click={handleLikeClick} actived={like}></LikeIcon>
      </div>
      <MusicInfo {...{ name, singer, lyrics, composer, arranger }}></MusicInfo>

      <div className={classes.control}>
        <Prev prev={prev}></Prev>
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
