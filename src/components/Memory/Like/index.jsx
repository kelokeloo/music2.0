import { HeartOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getMemoryWhoLike } from "../../../Api/memory";
import { setMemoryLike, unLikeMemory } from "../../../Api/memory";

function useLike(memoryId, setLike) {
  useEffect(() => {
    async function fetch() {
      const result = await getMemoryWhoLike(memoryId);
      const { code, data: likes } = result;
      if (code === -1) {
        return;
      }
      const curUserId = sessionStorage.getItem("_id");
      if (likes.includes(curUserId)) {
        setLike(true);
      } else {
        setLike(false);
      }
    }
    fetch();
  }, []);
}
export function Like(props) {
  const { memoryId } = props;
  const [like, setLike] = useState(false);
  const iconStyle = {
    fontSize: "1.2rem",
    color: like ? "rgba(211, 58, 44)" : "",
  };
  useLike(memoryId, setLike);
  function handleLikeClick() {
    setLike(async (like) => {
      try {
        const userId = sessionStorage.getItem("_id");
        if (like) {
          await unLikeMemory(memoryId, userId);
          setLike(false);
        } else {
          await setMemoryLike(memoryId, userId);
          setLike(true);
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  return (
    <div>
      <HeartOutlined
        style={iconStyle}
        onClick={handleLikeClick}
      ></HeartOutlined>
    </div>
  );
}
