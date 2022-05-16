import classes from "./index.module.scss";
import { RangeItem } from "./RangeItem";
export function Hot() {
  return (
    <>
      <h1 style={{ fontWeight: "bold", marginTop: "1rem" }}>热门歌曲</h1>
      <div className={classes.Box}>
        <RangeItem range={1}></RangeItem>
        <RangeItem range={2}></RangeItem>
        <RangeItem range={3}></RangeItem>
      </div>
    </>
  );
}
