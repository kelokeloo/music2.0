import classes from "./index.module.scss";
import { getMusicById } from "../../../Api/music";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

async function getAlbumFirstMusicImg(album) {
  const { musics } = album;
  const musicId = musics.length > 0 ? musics[0] : null;
  if (!musicId) return "";
  try {
    const result = await getMusicById(musicId);
    const { code, data } = result;
    if (code === -1) return;
    const { musicInfo } = data;
    return musicInfo.img;
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

function useFetchImg(setImg, album) {
  useEffect(() => {
    async function fetch() {
      const img = await getAlbumFirstMusicImg(album);
      setImg(img);
    }
    fetch();
  }, []);
}

export function AlbumItem(props) {
  const { album } = props;
  const [img, setImg] = useState("");
  const Navigate = useNavigate();
  useFetchImg(setImg, album);

  function handleClick() {
    const { _id: albumId } = album;
    Navigate(`/album/${albumId}`);
  }
  return (
    <div
      className={classes.box}
      style={{
        backgroundImage: `url(${img})`,
      }}
      onClick={handleClick}
    >
      {album.name}
    </div>
  );
}
