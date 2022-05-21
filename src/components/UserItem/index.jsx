import classes from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { CommentOutlined, UserAddOutlined } from "@ant-design/icons";
import { Focus } from "./Focus";
export function UserItem(props) {
  const { account, img, nickName, _id } = props;
  const Navigate = useNavigate();
  function handleCommentClick() {
    Navigate(`/dialog/${_id}`);
  }

  const iconStyle = {
    color: "rgba(211, 58, 44)",
    fontSize: "1.5rem",
  };

  return (
    <div className={classes.box}>
      <div className={classes.img}>
        <img src={img} alt={nickName} />
      </div>
      <div className={classes.info}>
        <div>{nickName}</div>
        <div>{account}</div>
      </div>
      <div className={classes.control}>
        <div onClick={handleCommentClick}>
          <CommentOutlined style={iconStyle} />
        </div>
        <div>
          <Focus userId={_id} />
        </div>
      </div>
    </div>
  );
}
