import classes from "./index.module.scss";
export function MusicInfo(props) {
  const { name, singer, lyrics, composer, arranger } = props;
  return (
    <div className={classes.musicInfo}>
      <div>{name ? name : "name"}</div>
      <div>歌手: {singer ? singer : "singer"}</div>
      <div>作词: {lyrics.length > 0 ? lyrics.join() : "lyrics"}</div>
      <div>作曲: {composer.length > 0 ? composer.join() : "composer"}</div>
      <div>编曲: {arranger.length > 0 ? arranger.join() : "arranger"}</div>
    </div>
  );
}
