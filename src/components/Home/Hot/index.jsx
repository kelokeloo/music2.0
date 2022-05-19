import classes from "./index.module.scss";
import { RangeItem } from "./RangeItem";
import { useEffect, useState } from "react";
import { getRangeData } from "../../../Api/home";
import { useContext } from "react";
import { PlayerCtx } from "../../../../Context/PlayerContext";

function useFetch(setMusics) {
  useEffect(() => {
    async function fetch() {
      const result = await getRangeData();
      const { code, data } = result;
      if (code === -1) return;
      setMusics(data);
    }
    fetch();
  }, []);
}
export function Hot() {
  const [musics, setMusics] = useState([]);
  useFetch(setMusics);
  const { loadMusics } = useContext(PlayerCtx);

  function itemClick(music) {
    loadMusics(musics, music);
  }
  return (
    <>
      <h1 style={{ fontWeight: "bold", marginTop: "1rem" }}>热门歌曲</h1>
      <div className={classes.Box}>
        {musics.map((music, index) => {
          return (
            <RangeItem
              range={index + 1}
              music={music}
              key={music._id}
              itemClick={itemClick}
            ></RangeItem>
          );
        })}
      </div>
    </>
  );
}
