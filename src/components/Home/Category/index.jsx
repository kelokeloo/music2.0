import classes from "./index.module.scss";
import { Button } from "antd";
export function Category() {
  return (
    <>
      <header className={classes.header}>
        <h1 style={{ fontWeight: "bold", marginTop: "1rem" }}>分类检索</h1>
        <Button type="dashed" shape="round">
          更多
        </Button>
      </header>
      <div className={classes.Box}>
        <section className={classes.item}>1</section>
        <section className={classes.item}>2</section>
        <section className={classes.item}>3</section>
      </div>
    </>
  );
}
