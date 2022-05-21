import classes from "./index.module.scss";
import { Avatar, Input, Button } from "antd";
const { TextArea } = Input;
import { useId, useState } from "react";
import { ImgList } from "../ImgList";
import { CommentInput } from "../CommentInput";
import { Like } from "../Like";
export function MemoryItem(props) {
  const { userId, time, imgList, content, comment, _id } = props;
  const [toUserId, setToUserId] = useState(userId);

  return (
    <div className={classes.box}>
      <div className={classes.header}>
        <Avatar></Avatar>
      </div>
      <div className={classes.main}>
        <div>name</div>
        <div>content</div>
        <ImgList list={imgList}></ImgList>
        <Like memoryId={_id}></Like>
        <CommentInput sendTo={userId}></CommentInput>
      </div>
    </div>
  );
}
