import { getAllMemorys } from "../../Api/memory";
import { memo, useEffect, useState } from "react";
import { getUserFocus } from "../../Api/user";
import { MemoryItem } from "../../components/Memory/MemoryItem";
import classes from "./index.module.scss";

function useFetch(setMemorys) {
  useEffect(() => {
    async function fetch() {
      const userId = sessionStorage.getItem("_id");
      const { code: FocusCode, data: Focucs } = await getUserFocus(userId);
      let { code: MemorysCode, data: Memorys } = await getAllMemorys();
      if (FocusCode === -1 || MemorysCode === -1) {
        setMemorys([]);
        return;
      }
      let memorys = Memorys.filter((memory) => {
        return memory.userId === userId || Focucs.includes(memory.userId);
      });
      setMemorys(memorys);
      console.log(memorys);
    }
    fetch();
  }, []);
}

export function Memory() {
  const [memorys, setMemorys] = useState([]);
  useFetch(setMemorys);
  return (
    <div className={classes.box}>
      {memorys.map((memory, index) => {
        return <MemoryItem key={index} {...memory}></MemoryItem>;
      })}
    </div>
  );
}
