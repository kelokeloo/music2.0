import classes from "./index.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { useContext, useState, useEffect } from "react";
import { PlayerCtx } from "../../../Context/PlayerContext";
import { useLocation } from "react-router-dom";

function useAddressEffect(setShow, Location) {
  useEffect(() => {
    const { pathname } = Location;
    switch (pathname) {
      case "/":
      case "/chatlist":
        setShow(true);
        break;
      default:
        setShow(false);
        break;
    }
  }, [Location]);
}

export function MiniPlayer({ showPlayer }) {
  const { curState, play, pause, curMusic } = useContext(PlayerCtx);
  const [show, setShow] = useState(false);
  const Location = useLocation();
  useAddressEffect(setShow, Location);
  const {
    img,
    name,
    singer: singerArray,
  } = curMusic ? curMusic : { img: "", name: "", singer: [] };

  function controlClick() {
    if (!curState) {
      play();
    } else {
      pause();
    }
  }

  return (
    <div>
      {show ? (
        <>
          <div className={classes.box}>
            <div className={classes.img}>
              {curState ? (
                <img src={img} />
              ) : (
                <div className={classes.loading}>
                  <LoadingOutlined
                    style={{
                      color: "rgba(211, 58, 44)",
                    }}
                  />
                </div>
              )}
            </div>
            <div className={classes.music} onClick={() => showPlayer()}>
              <span>{name}</span>
              <span>-{singerArray.join(",")}</span>
            </div>
            <div className={classes.control}>
              <div className={classes.icon} onClick={controlClick}>
                {!curState ? (
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhang"></use>
                  </svg>
                ) : (
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-lianxi2hebing-15"></use>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
