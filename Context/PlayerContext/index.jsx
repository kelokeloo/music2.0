import { createContext, useState, useRef, useEffect } from "react";
import { message } from "antd";
import { addMusicCount } from "../../src/Api/music";
export const PlayerCtx = createContext();

// 判断音频是否可以播放
function _canPlay(audio) {
  switch (audio.readyState) {
    case 0:
      message.error("没有音频源");
      return false;
    case 1:
      message.error("正在加载");
      return false;
    case 2:
      return true;
    default:
      return true;
  }
}

// 加载播放列表
function _loadMusics(
  musics,
  music,
  setMusics,
  setCurMusic,
  setCurState,
  setCanPlayState
) {
  setCurState(true);
  setCanPlayState(false);
  setMusics(musics);
  setCurMusic(music);
  console.log("load", musics, music);
}
// 获取播放列表
function _getList(musics) {}

// 将音乐插入播放列表
function _addMusic(setCurMusic, setMusics, music, setCanPlayState) {
  // 设置播放状态
  setCanPlayState(false);
  setCurMusic((curMusic) => {
    // 拿到curMusic
    let _id = curMusic ? curMusic._id : null;
    setMusics((musics) => {
      if (!_id) {
        setCurMusic(music);
        return [music];
      }
      if (curMusic._id === music._id) {
        return musics;
      }
      // 删掉原来那首
      const originalMusicIndex = musics.findIndex(
        (item) => item._id === music._id
      );
      if (originalMusicIndex !== -1) {
        musics.splice(originalMusicIndex, 1);
      }

      const curMusicIndex = musics.findIndex((item) => item._id === _id);
      musics.splice(curMusicIndex, 0, music);
      setCurMusic(music);
      return [...musics];
    });
    return curMusic;
  });
}
// 播放下一首
function _next(curMusic, musics, setCurMusic, setCurState, setCanPlayState) {
  if (!curMusic) return;
  const { _id: curMusicId } = curMusic;
  const length = musics.length;
  const curMusicIndex = musics.findIndex((item) => item._id === curMusicId);
  if (length && 0 <= curMusicIndex && curMusicIndex <= length - 2) {
    setCurMusic(musics[curMusicIndex + 1]);
    setCurState(true);
    // 设置为false，音频加载成功之后会变成true
    setCanPlayState(false);
  }
  if (length && curMusicIndex === length - 1) {
    message.warn("已经是最后一首了");
  }
}
// 播放上一首
function _prev(curMusic, musics, setCurMusic, setCurState, setCanPlayState) {
  const { _id: curMusicId } = curMusic;
  const length = musics.length;
  const curMusicIndex = musics.findIndex((item) => item._id === curMusicId);
  if (length && 0 < curMusicIndex && curMusicIndex <= length - 1) {
    setCurMusic(musics[curMusicIndex - 1]);
    setCurState(true);
    // 设置为false，音频加载成功之后会变成true
    setCanPlayState(false);
  }
  if (length && curMusicIndex === 0) {
    message.warn("该首是第一首");
  }
}
// 播放
function _play(audio, setCurState, canplayState) {
  if (canplayState) {
    audio.play();
    setCurState(true);
  }
}
// 暂停
function _pause(audio, setCurState) {
  audio.pause();
  setCurState(false);
}
// 加载新音乐自动播放
function useloadMusicAutoPlay(audioRef, setCurState, canplayState) {
  // 监听加载状态，如果状态由false切换成true 就会播放curMusic里面的音乐，因此在加载其他音乐的时候，需要设置canplayState为false，好让其识别出可以播放，然后播放音乐
  useEffect(() => {
    if (canplayState === true) {
      const audio = audioRef.current;
      _play(audio, setCurState, canplayState);
    }
  }, [canplayState]);
}
// 监听音乐加载状态
function useListen(
  audioRef,
  setCanPlayState,
  curMusic,
  musics,
  setCurMusic,
  setCurState
) {
  useEffect(() => {
    const audio = audioRef.current;
    // 监听文件加载，如果加载成功会被设置为true
    audio.addEventListener("canplay", () => {
      setCanPlayState(true);
    });
    audio.addEventListener("ended", () => {
      console.log("播放结束");
      _next(curMusic, musics, setCurMusic, setCurState, setCanPlayState);
    });
  }, []);
}
// 记录当前音乐的播放次数
function useCurMusicCount(curMusic) {
  useEffect(() => {
    if (!curMusic) return;
    const { _id: musicId } = curMusic;
    async function fetch() {
      const res = await addMusicCount(musicId);
    }
    fetch();
  }, [curMusic]);
}

export function PlayerContext({ children }) {
  const [musics, setMusics] = useState([]);
  const [curMusic, setCurMusic] = useState(null);
  const [curState, setCurState] = useState(false);
  const [canplayState, setCanPlayState] = useState(false);
  const audioRef = useRef();
  useListen(
    audioRef,
    setCanPlayState,
    curMusic,
    musics,
    setCurMusic,
    setCurState
  );
  useloadMusicAutoPlay(audioRef, setCurState, canplayState);
  useCurMusicCount(curMusic);

  const CtxValue = {
    curState,
    curMusic,
    play: () => {
      _play(audioRef.current, setCurState, canplayState);
    },
    pause: () => {
      _pause(audioRef.current, setCurState);
    },
    addToMusics: (music) => {
      _addMusic(setCurMusic, setMusics, music, setCanPlayState);
    },
    next: () => {
      _next(curMusic, musics, setCurMusic, setCurState, setCanPlayState);
    },
    prev: () => {
      _prev(curMusic, musics, setCurMusic, setCurState, setCanPlayState);
    },
    loadMusics: (musics, music) => {
      _loadMusics(
        musics,
        music,
        setMusics,
        setCurMusic,
        setCurState,
        setCanPlayState
      );
    },
  };

  // log
  useEffect(() => {
    console.log(
      "%c[player]当前播放的音乐：" + JSON.stringify(curMusic),
      "color:rgb(255, 87, 34); font-weight: bold"
    );
  }, [curMusic]);
  useEffect(() => {
    console.log(
      "%c[player]播放状态：" + (curState ? "播放" : "暂停"),
      "color:rgb(255, 87, 34); font-weight: bold"
    );
  }, [curState]);
  useEffect(() => {
    console.log(
      "%c[player]当前播放列表：",
      "color:rgb(255, 87, 34); font-weight: bold",
      musics
    );
  }, [musics]);

  return (
    <PlayerCtx.Provider value={CtxValue}>
      {children}
      <audio
        // autoPlay
        ref={audioRef}
        src={curMusic ? curMusic.source : ""}
      ></audio>
    </PlayerCtx.Provider>
  );
}
