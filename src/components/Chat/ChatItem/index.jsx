import classes from "./index.module.scss";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Notify } from "../Notify";
import { useNavigate } from "react-router-dom";
export function ChatItem(props) {
  const { img, nickName, newMessage, count, fromId } = props;
  const Navigate = useNavigate();
  const {
    data: { type, content },
  } = newMessage;

  function ItemClick() {
    Navigate(`/dialog/${fromId}`);
  }

  return (
    <div className={classes.box} onClick={ItemClick}>
      <div className={classes.img}>
        <img src={img} alt={nickName} />
      </div>
      <div className={classes.content}>
        <div>{nickName}</div>
        <div>
          <span>{content}</span>
          <Notify count={count}></Notify>
        </div>
      </div>
    </div>
  );
}
