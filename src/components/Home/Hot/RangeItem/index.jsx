import classes from "./index.module.scss";
import "./index.module.scss";

export function RangeItem({ range }) {
  return (
    <div className={classes.box}>
      <span>{range}</span>
      <div className={classes.img}>
        <img></img>
      </div>
      <div className={classes.content}>
        <div>name</div>
        <div>singer</div>
      </div>
    </div>
  );
}
