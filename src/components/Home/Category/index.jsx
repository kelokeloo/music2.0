import classes from "./index.module.scss";
export function Category() {
  return (
    <>
      <h1 style={{ fontWeight: "bold", marginTop: "1rem" }}>分类检索</h1>
      <div className={classes.Box}>
        <section className={classes.item}>1</section>
        <section className={classes.item}>2</section>
        <section className={classes.item}>3</section>
      </div>
    </>
  );
}
