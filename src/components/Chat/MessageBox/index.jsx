import { Avatar } from "antd";
import classes, { leftBox, rightBox } from "./index.module.scss";
import moment from "moment";

export function MessageBox(props) {
  const { position, username, time, content, img } = props;
  const boxStyle = position === "left" ? leftBox : rightBox;
  return (
    <div className={classes.box}>
      <div className={boxStyle}>
        <Avatar src={img} />
        <div>
          <div className={classes.title}>
            <span>{username}</span>
            <span>{moment(Number(time)).fromNow()}</span>
          </div>
          <div className={classes.main}>
            <div>
              <span>{content}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
