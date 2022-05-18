import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getAlbumByID } from "../../Api/album";
import { getMusicById } from "../../Api/music";
import { ComHeader } from "../../components/Header";
import { MusicItem } from "../../components/Album/MusicItem";
import classes from "./index.module.scss";
import { PlayerCtx } from "../../../Context/PlayerContext";
function useFetch(albumId, setMusics, setAlbum) {
  if (!albumId) return;
  useEffect(() => {
    async function fetch() {
      try {
        const result = await getAlbumByID(albumId);
        const { code, data } = result;
        if (code === -1) return;
        setAlbum(data);
        const { name, musics } = data;
        const results = await Promise.all(
          musics.map((musicId) => {
            return getMusicById(musicId);
          })
        );
        const musicList = results
          .filter((result) => result.code !== -1)
          .map(({ data: { musicInfo } }) => {
            return musicInfo;
          });
        setMusics(musicList);
      } catch (e) {
        console.log(e);
        setMusics([]);
      }
    }
    fetch();
  }, []);
}
export function Album() {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [musics, setMusics] = useState([]);
  const { loadMusics } = useContext(PlayerCtx);

  useFetch(albumId, setMusics, setAlbum);
  function musicClick(music) {
    loadMusics(musics, music);
  }

  return (
    <div>
      <ComHeader title={album ? album.name : ""}></ComHeader>
      <div className={classes.main}>
        {musics.map((item) => {
          return (
            <MusicItem
              music={item}
              key={item._id}
              musicClick={()=>musicClick(item)}
            ></MusicItem>
          );
        })}
      </div>
    </div>
  );
}
