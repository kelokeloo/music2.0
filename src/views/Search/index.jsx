import { ComHeader } from "../../components/Header";
import classes from "./index.module.scss";
import { Input, Button } from "antd";
import { useState, useEffect } from "react";
const { Search: AntSearch } = Input;
import { search } from "../../Api/Search";
import { ResultRender } from "./ResultRender";

function useFetch(value, setResult) {
  useEffect(() => {
    async function fetch() {
      if (value === "") {
        setResult([]);
        return;
      }
      const result = await search(value);

      const { code, data } = result;
      if (code === -1) {
        setResult([]);
        return;
      }
      setResult(data);
    }
    fetch();
  }, [value]);
}

export function Search() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  useFetch(value, setResult);

  function ChannelClick(channel) {
    setChannel(channel);
  }
  async function handleSearch(keyword) {
    setValue(keyword);
  }

  return (
    <div className={classes.OutBox}>
      <div className={classes.header}>
        <ComHeader title="搜索"></ComHeader>
      </div>
      <div className={classes.box}>
        <AntSearch onSearch={handleSearch}></AntSearch>
        <div className={classes.content}>
          <ResultRender data={result}></ResultRender>
        </div>
      </div>
    </div>
  );
}
