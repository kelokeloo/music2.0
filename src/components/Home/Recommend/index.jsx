import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./styles.css";
import classes from "./index.module.scss";
import { EffectCards } from "swiper";

import { getLikeData } from "../../../Api/home";

function useFetch(setMusics) {
  useEffect(() => {
    async function fetch() {
      const { code, data } = await getLikeData();
      console.log(data);
      if (code === -1) return;
      setMusics(data);
    }
    fetch();
  }, []);
}

export default function Recommend() {
  const [musics, setMusics] = useState([]);
  useFetch(setMusics);
  function SwiperClick(music) {
    console.log(music);
  }
  return (
    <>
      <h1 style={{ fontWeight: "bold", marginTop: "1rem" }}>精选推荐</h1>
      <div className={classes.swiperBox}>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {musics.map((music) => {
            return (
              <SwiperSlide key={music._id} onClick={() => SwiperClick(music)}>
                <div className={classes.swiper}>
                  <img src={music.img} alt={music.name} />
                  <p className={classes.discription}>{music.name}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
