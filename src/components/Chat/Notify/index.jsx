import classes from "./index.module.scss";
export function Notify(props) {
  const { count } = props;
  return count ? <span className={classes.box}>{count}</span> : null;
}
