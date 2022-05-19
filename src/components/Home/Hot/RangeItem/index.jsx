import classes from "./index.module.scss";
import "./index.module.scss";

export function RangeItem({ range, music, itemClick }) {
  const { name, singer, img, count } = music;
  return (
    <div className={classes.box} onClick={() => itemClick(music)}>
      <span>{range}</span>
      <div className={classes.img}>
        <img src={img}></img>
      </div>
      <div className={classes.content}>
        <div>{name}</div>
        <div>{singer}</div>
      </div>
      <div>{count}</div>
    </div>
  );
}
