import classes from "./index.module.scss";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export function ComHeader(props) {
  const { title } = props;
  const Navigate = useNavigate();
  function handleBackClick() {
    Navigate(-1);
  }
  return (
    <header className={classes.box}>
      <CaretLeftOutlined className={classes.icon} onClick={handleBackClick} />
      <div className={classes.title}>{title ? title : ""}</div>
    </header>
  );
}
