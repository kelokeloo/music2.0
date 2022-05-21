import { useState, useEffect } from "react";
import { getUserInfo } from "../../../../Api/user";

function useGetUser(userId) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetch() {
      const result = await getUserInfo(userId);
      const { code, data: userInfo } = result;
      if (code === -1) {
        setUser(null);
        return;
      }
      setUser(userInfo);
    }
    fetch();
  }, []);
  return user;
}
export function Comment(props) {
  const { from, to, content, handleCommentClick } = props;
  const fromUser = useGetUser(from);
  const toUser = useGetUser(to);
  function handleClick() {
    handleCommentClick(from);
  }
  return (
    <div onClick={handleClick}>
      <span>{fromUser ? fromUser.nickName : ""}</span>
      <span> 回复 </span>
      <span>{toUser ? toUser.nickName : ""}:</span>
      <span>{content}</span>
    </div>
  );
}
