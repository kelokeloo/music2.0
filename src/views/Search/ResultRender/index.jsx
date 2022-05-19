import { Tag } from "antd";
import { AlbumItem } from "../../../components/Album/AlbumItem";
import { AlbumLongItem } from "../../../components/Album/AlbumLongItem";
import { MusicItem } from "../../../components/Album/MusicItem";
import classes from "./index.module.scss";
import { PlayerCtx } from "../../../../Context/PlayerContext";
import { useContext, useEffect, useState } from "react";
import { getMusicsBySinger } from "../../../Api/music";
function AlbumRender({ album }) {
  return (
    <div className={classes.albumBox}>
      <AlbumItem album={album}></AlbumItem>
    </div>
  );
}

function useMusicEffect(setMusics, music) {
  const { singer } = music;
  async function fetch() {
    console.log("[singer]", singer);
    const result = await getMusicsBySinger(singer);
    // 筛选出 3首作为推荐的音乐，排除当前音乐
    const { code, data } = result;
    if (code === -1) return;
    // 去除该首
    const showData = data.filter((item) => item._id !== music._id).slice(0, 3);
    setMusics(showData);
    console.log("相关推荐", result, showData);
  }
  useEffect(() => {
    fetch();
  }, [music]);
}

function RelationMusics(props) {
  const { data, musicClick } = props;
  return (
    <div>
      {data.map((item) => {
        return (
          <MusicItem
            music={item}
            tag={<Tag color="magenta">音乐</Tag>}
            key={item._id}
            musicClick={musicClick}
          ></MusicItem>
        );
      })}
    </div>
  );
}

function MusicRender({ music, musicClick, tag }) {
  const { img, name, singer, lyrics, composer, arranger } = music;
  const [musics, setMusics] = useState([]);
  const { loadMusics } = useContext(PlayerCtx);
  useMusicEffect(setMusics, music);
  function handleClick(music) {
    musicClick(music);
  }
  function handleRelationClick(music) {
    loadMusics(musics, music);
  }
  return (
    <div>
      <div className={classes.TopRenderBox} onClick={() => handleClick(music)}>
        <div className={classes.TopRenderImg}>
          <img src={img} alt={name} />
        </div>
        <div className={classes.TopRenderContent}>
          <h2>{name}</h2>
          <div>歌手：{singer}</div>
          <div>作词：{lyrics.join(",")}</div>
          <div>作曲：{composer.join(",")}</div>
          <div>
            {arranger.length > 0 ? "编曲：" + arranger.join(",") : null}
          </div>
        </div>
      </div>
      {musics.length <= 1 ? null : (
        <div className={classes.relation}>
          <Tag color="volcano">相关推荐</Tag>
          <RelationMusics
            data={musics}
            musicClick={handleRelationClick}
          ></RelationMusics>
        </div>
      )}
    </div>
  );
}

function TopRender(props) {
  const { data, musicClick } = props;
  const { type } = data.append;
  switch (type) {
    case "album":
      return (
        <AlbumRender
          album={data}
          tag={<Tag color="magenta">歌单</Tag>}
        ></AlbumRender>
      );
    case "music":
      return (
        <MusicRender
          music={data}
          musicClick={musicClick}
          tag={<Tag color="magenta">音乐</Tag>}
        ></MusicRender>
      );

    default:
      return null;
  }
}

/**
 * 渲染剩下的
 */
function RenderRemain(props) {
  let { data, musicClick } = props;
  if (data.length <= 1) return null;
  data = data.slice(1);
  return (
    <div className={classes.remain}>
      {data.map((item) => {
        switch (item.append.type) {
          case "music":
            return (
              <MusicItem
                music={item}
                tag={<Tag color="magenta">音乐</Tag>}
                key={item._id}
                musicClick={musicClick}
              ></MusicItem>
            );
          case "album":
            return (
              <AlbumLongItem
                album={item}
                tag={<Tag color="magenta">歌单</Tag>}
                key={item._id}
              ></AlbumLongItem>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export function ResultRender(props) {
  const { data } = props;
  const { loadMusics } = useContext(PlayerCtx);
  if (data.length === 0) return null;
  const firstData = data[0];

  function handleMusicClick(music) {
    const musics = data.filter((item) => {
      if (item.append.type === "music") return true;
      return false;
    });
    loadMusics(musics, music);
  }

  return (
    <div>
      <div>
        <header>
          <Tag color="magenta">最佳匹配</Tag>
        </header>
        <div className={classes.TopRenderBox}>
          <TopRender
            className={classes.TopRender}
            data={firstData}
            musicClick={handleMusicClick}
          ></TopRender>
        </div>
      </div>
      {/* 渲染剩下的 */}
      <div>
        <RenderRemain data={data} musicClick={handleMusicClick} />
      </div>
    </div>
  );
}
