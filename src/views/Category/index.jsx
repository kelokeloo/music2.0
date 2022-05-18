import { ComHeader } from "../../components/Header";
import { useEffect, useState } from "react";
import { getAllAlbum } from "../../Api/album";
import classes from "./index.module.scss";
import { AlbumItem } from "../../components/Album/AlbumItem";

function useFetch(setAlbums) {
  useEffect(() => {
    async function fetch() {
      const result = await getAllAlbum();
      const { code, data } = result;
      if (code === -1) return;
      const { albums } = data;
      setAlbums(albums);
    }
    fetch();
  }, []);
}
export function Category(props) {
  const [albums, setAlbums] = useState([]);
  useFetch(setAlbums);
  return (
    <div>
      <ComHeader title="分类"></ComHeader>
      <div className={classes.content}>
        {albums.map((item) => {
          return <AlbumItem album={item}></AlbumItem>;
        })}
      </div>
    </div>
  );
}
