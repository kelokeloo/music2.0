import { SearchOutlined } from "@ant-design/icons";
import classes from "./index.module.scss";
import Recommend from "../../components/Home/Recommend";
import { Category } from "../../components/Home/Category";
import { Hot } from "../../components/Home/Hot";
import { useNavigate } from "react-router-dom";
export function Home() {
  const Navigate = useNavigate();
  function searchClick() {
    Navigate("/search");
  }
  return (
    <div className={classes.box}>
      <header className={classes.searchBox}>
        <SearchOutlined
          className={[classes.Icon]}
          onClick={() => searchClick()}
        ></SearchOutlined>
      </header>
      <section className={classes.now}>
        <h1>现在就听</h1>
      </section>
      <section className={classes.RecommendBox}>
        <Recommend></Recommend>
      </section>
      <section className={classes.category}>
        <Category></Category>
      </section>
      <section className={classes.hot}>
        <Hot></Hot>
      </section>
      <div className={classes.placeHolder}></div>
    </div>
  );
}
