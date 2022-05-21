import classes from "./index.module.scss";
import { Avatar, Input, Button } from "antd";
const { TextArea } = Input;
import { useEffect, useState } from "react";
import { ImgList } from "../ImgList";
import { CommentInput } from "../CommentInput";
import { Like } from "../Like";
import { getUserInfo } from "../../../Api/user";
import { Comments } from "../Comments";
import { addComment as addCommentToServer } from "../../../Api/memory";

function useUserInfo(userId) {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    async function fetch() {
      const result = await getUserInfo(userId);
      const { code, data: userInfo } = result;
      if (code === -1) {
        setUserInfo(null);
        return;
      }
      setUserInfo(userInfo);
    }
    fetch();
  }, []);
  return userInfo;
}

function useComment(comment, memoryId) {
  const [comments, setComments] = useState(comment);
  async function addComment(from, to, content) {
    const newComment = {
      from,
      to,
      content,
      time: String(new Date().valueOf()),
    };
    // 同步到数据库
    const result = await addCommentToServer(memoryId, newComment);
    setComments((comments) => {
      comments.push(newComment);
      return [...comments];
    });
  }
  return [comments, addComment];
}

export function MemoryItem(props) {
  const { userId, time, imgList, content, comment, _id } = props;
  const [sendToUserId, setSendToUserId] = useState(userId);
  const [comments, addComment] = useComment(comment, _id);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const userInfo = useUserInfo(userId);

  function handleCommentClick(toUserId) {
    console.log(toUserId);
    setSendToUserId(toUserId);
  }

  return (
    <div className={classes.box}>
      <div className={classes.header}>
        <Avatar src={userInfo ? userInfo.img : ""}></Avatar>
      </div>
      <div className={classes.main}>
        <div>{userInfo ? userInfo.nickName : ""}</div>
        <div>{content}</div>
        <ImgList list={imgList}></ImgList>
        <Like memoryId={_id}></Like>
        <Comments
          comments={comments}
          handleCommentClick={handleCommentClick}
        ></Comments>
        <CommentInput
          sendTo={sendToUserId}
          addComment={addComment}
        ></CommentInput>
      </div>
    </div>
  );
}
