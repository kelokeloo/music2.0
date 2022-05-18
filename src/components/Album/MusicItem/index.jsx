import classes from "./index.module.scss";
export function MusicItem(props) {
  const { music, musicClick } = props;
  const { img, name, singer } = music;

  function handleClick() {
    const musicId = music._id;
    musicClick(musicId);
  }
  return (
    <div className={classes.box} onClick={handleClick}>
      <div className={classes.img}>
        <img src={img} alt={name} />
      </div>
      <div className={classes.content}>
        <div>{name}</div>
        <div>{singer}</div>
      </div>
    </div>
  );
}
