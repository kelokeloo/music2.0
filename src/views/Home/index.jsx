import { SearchOutlined } from "@ant-design/icons";
import classes from "./index.module.scss";
import Recommend from "../../components/Home/Recommend";
import { Category } from "../../components/Home/Category";
import { Hot } from "../../components/Home/Hot";
export function Home() {
  return (
    <div>
      <header className={classes.searchBox}>
        <SearchOutlined className={[classes.Icon]}></SearchOutlined>
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
    </div>
  );
}
