import classes from "./index.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
export function MiniPlayer() {
  return (
    <div className={classes.box}>
      <div className={classes.img}>
        {false ? (
          <img src="" />
        ) : (
          <LoadingOutlined
            style={{
              color: "rgba(211, 58, 44)",
            }}
          />
        )}
      </div>
      <div className={classes.music}>
        <span>name</span>
        <span>-singer</span>
      </div>
      <div className={classes.control}>
        <div className={classes.icon}>
          <svg class="icon" aria-hidden="true">
            <use xlinkHref="#icon-yunhang"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}
