import classes from "./index.module.scss";
import { Button, Input } from "antd";
const { TextArea } = Input;
import { CommentFrame } from "../../../dataStruct";
import { useEffect, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { getUserInfo } from "../../../Api/user";

function useToUserIdInfo(toUserId) {
  const [toUserInfo, setToUserInfo] = useState(null);
  useEffect(() => {
    async function fetch() {
      const result = await getUserInfo(toUserId);
      const { code, data: userInfo } = result;
      if (code === -1) {
        setToUserInfo(null);
        return;
      }
      setToUserInfo(userInfo);
    }
    fetch();
  }, [toUserId]);
  return toUserInfo;
}

export function CommentInput(props) {
  const { sendTo: toUserId, addComment } = props;
  const [inputValue, setInputValue] = useState("");
  const toUserInfo = useToUserIdInfo(toUserId);
  function inputChange(e) {
    const value = e.target.value;
    setInputValue(value);
  }

  function handleSend() {
    const curUserId = sessionStorage.getItem("_id");
    addComment(curUserId, toUserId, inputValue);
    setInputValue("");
  }
  return (
    <div className={classes.commentInput}>
      <TextArea
        autoSize
        value={inputValue}
        onChange={inputChange}
        placeholder={`回复给 ${toUserInfo ? toUserInfo.nickName : ""}`}
      ></TextArea>
      <Button icon={<SendOutlined />} onClick={handleSend}></Button>
    </div>
  );
}
