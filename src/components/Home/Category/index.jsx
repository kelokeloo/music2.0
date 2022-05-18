import classes from "./index.module.scss";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { getAllAlbum } from "../../../Api/album";
import { AlbumItem } from "../../Album/AlbumItem";
import { useNavigate } from "react-router-dom";

function useFetch(setAlbums) {
  useEffect(() => {
    async function fetch() {
      const res = await getAllAlbum();
      const { code, data } = res;
      if (code === -1) return;
      const { albums } = data;
      setAlbums(albums);
    }
    fetch();
  }, []);
}

export function Category() {
  const [albums, setAlbums] = useState([]);
  const Navigate = useNavigate();
  useFetch(setAlbums);
  function getMore() {
    Navigate("/navigate");
  }

  return (
    <>
      <header className={classes.header}>
        <h1 style={{ fontWeight: "bold", marginTop: "1rem" }}>分类检索</h1>
        <Button type="dashed" shape="round" onClick={() => getMore()}>
          更多
        </Button>
      </header>
      <div className={classes.Box}>
        {albums.map((album) => {
          return (
            <div className={classes.item} key={album._id}>
              <AlbumItem key={album._id} album={album}></AlbumItem>
            </div>
          );
        })}
      </div>
    </>
  );
}
