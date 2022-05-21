import classes from "./index.module.scss";
import { useState, useEffect } from "react";
import { getUserFocus } from "../../../Api/user";
import { addFocus, cancelFocus } from "../../../Api/user";

function useIsFocus(userId, curUserId, setFocus) {
  useEffect(() => {
    async function fetch() {
      const result = await getUserFocus(curUserId);
      const { code, data: focus } = result;
      if (code === -1) {
        setFocus(false);
        return;
      }
      const index = focus.findIndex((Id) => {
        return Id === userId;
      });
      setFocus(index === -1 ? false : true);
    }
    fetch();
  }, []);
}
export function Focus(props) {
  const { userId } = props;
  const curUserId = sessionStorage.getItem("_id");
  const [focus, setFocus] = useState(false);
  useIsFocus(userId, curUserId, setFocus);

  async function handleFocus() {
    try {
      if (!focus) {
        const result = await addFocus(curUserId, userId);
        if (result) {
          setFocus(true);
        }
      } else {
        const result = await cancelFocus(curUserId, userId);
        const { code } = result;
        if (result) {
          setFocus(false);
        }
      }
    } catch (e) {
      console.log("focus 出错");
    }
  }
  return (
    <div className={classes.box} onClick={handleFocus}>
      <div>{focus ? "已关注" : "关注"}</div>
    </div>
  );
}
