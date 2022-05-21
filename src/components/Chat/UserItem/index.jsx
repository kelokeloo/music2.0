import classes from "./index.module.scss";
import { useNavigate } from "react-router-dom";
export function UserItem(props) {
  const { account, img, nickName, _id } = props;
  const Navigate = useNavigate();
  function handleClick() {
    console.log("go to", _id);
    Navigate(`/dialog/${_id}`);
  }
  return (
    <div className={classes.box} onClick={handleClick}>
      <div className={classes.img}>
        <img src={img} alt={nickName} />
      </div>
      <div className={classes.info}>
        <div>{nickName}</div>
        <div>{account}</div>
      </div>
    </div>
  );
}
