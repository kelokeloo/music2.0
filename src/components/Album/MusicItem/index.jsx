import classes from "./index.module.scss";
export function MusicItem(props) {
  const { music, musicClick, tag } = props;
  const { img, name, singer } = music;

  function handleClick() {
    const musicId = music._id;
    musicClick(music);
  }
  return (
    <div className={classes.box} onClick={handleClick}>
      <div className={classes.img}>
        <img src={img} alt={name} />
      </div>
      <div className={classes.content}>
        <div className={classes.NameBox}>
          <span>{name}</span>
          <span>{tag ? tag : null}</span>
        </div>
        <div>{singer}</div>
      </div>
    </div>
  );
}
