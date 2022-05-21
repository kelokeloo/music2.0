import classes from "./index.module.scss";
import { Button, Input } from "antd";
const { TextArea } = Input;
import { CommentFrame } from "../../../dataStruct";
import { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
export function CommentInput(props) {
  const { sendTo: toUserId } = props;
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState("评论");
  function inputChange(e) {
    const value = e.target.value;
    setInputValue(value);
  }

  function handleSend() {
    const curUserId = sessionStorage.getItem("_id");
    const Frame = CommentFrame(
      inputValue,
      curUserId,
      String(new Date().valueOf()),
      toUserId
    );
    console.log(Frame);
  }
  return (
    <div className={classes.commentInput}>
      <TextArea
        autoSize
        value={inputValue}
        onChange={inputChange}
        placeholder={placeholder}
      ></TextArea>
      <Button icon={<SendOutlined />} onClick={handleSend}></Button>
    </div>
  );
}
