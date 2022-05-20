import {
  CustomerServiceOutlined,
  UserOutlined,
  CommentOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import classes from "./index.module.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useAddressEffect(setActived, Location) {
  useEffect(() => {
    const { pathname } = Location;
    switch (pathname) {
      case "/":
        setActived(0);
        break;
      case "/chatlist":
        setActived(1);
        break;

      default:
        setActived(-1);
        break;
    }
  }, [Location]);
}

export function Tab() {
  const [actived, setActived] = useState(-1);
  const Location = useLocation();
  const Navigate = useNavigate();

  // 副作用 根据路由变化来决定当前actived的值，并通过actived值控制是否显示
  useAddressEffect(setActived, Location);

  function ClickTab(index) {
    // 直接写跳转的位置，不必修改SetActived
    // setActived(index);
    switch (index) {
      case 0:
        Navigate("/");
        break;
      case 1:
        Navigate("/chatlist");
        break;

      default:
        break;
    }
  }

  const layout = {
    style: {
      fontSize: "1.6rem",
    },
  };
  const icons = [
    <CustomerServiceOutlined {...layout} />,
    <CommentOutlined {...layout} />,
    <InstagramOutlined {...layout} />,
    <UserOutlined {...layout} />,
  ];
  return (
    <div>
      {actived >= 0 && actived < 4 ? (
        <div className={classes.box}>
          {icons.map((item, index) => {
            return (
              <div
                className={classes.navItemBox}
                key={index}
                onClick={() => ClickTab(index)}
              >
                <section
                  className={actived === index ? classes.activedStyle : ""}
                >
                  {item}
                </section>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
