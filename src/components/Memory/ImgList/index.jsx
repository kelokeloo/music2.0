import classes from "./index.module.scss";
export function ImgList(props) {
  let { list } = props;
  if (!list) list = [];
  return (
    <div className={classes.imgList}>
      {list.map((img, index) => {
        return (
          <div className={classes.imgBox} key={index}>
            <img src={img} alt="img" />
          </div>
        );
      })}
    </div>
  );
}
