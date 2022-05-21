import { Drawer, Input } from "antd";
import { useState } from "react";
import { UserItem } from "../../../components/Chat/UserItem";
import classes from "./index.module.scss";
import { searchUser } from "../../../Api/user";
export function SearchDrawer(props) {
  const { visible, close } = props;
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);

  async function handleValueChange(e) {
    const value = e.target.value;
    setValue(value);
    if (value === "") return;
    const result = await searchUser(value);
    const { code, data } = result;
    if (code === -1) {
      setUsers([]);
      return;
    }
    setUsers(data);
  }

  return (
    <>
      <Drawer visible={visible} onClose={() => close()} placement="bottom">
        <div className={classes.box}>
          <Input
            placeholder="输入用户"
            value={value}
            onChange={handleValueChange}
          ></Input>
          <div className={classes.users}>
            {users.map((user) => {
              const { account, img, nickName, _id } = user;
              const info = { account, img, nickName, _id };
              return <UserItem {...info}></UserItem>;
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
}
