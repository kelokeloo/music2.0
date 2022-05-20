import { Input } from "antd";
const { TextArea } = Input;
import { CustomerServiceOutlined } from "@ant-design/icons";
import classes from "./index.module.scss";
import { useState } from "react";
export function MsgInput(props) {
  const { send } = props;
  const [value, setValue] = useState("");
  function handleValueChange(e) {
    setValue(e.target.value);
  }
  function handleSend() {
    send(value);
    setValue("");
  }

  return (
    <div className={classes.box}>
      <div>
        <CustomerServiceOutlined />
      </div>
      <TextArea
        autoSize={{ maxRows: 2 }}
        value={value}
        onChange={handleValueChange}
      ></TextArea>
      <div onClick={handleSend}>发送</div>
    </div>
  );
}
