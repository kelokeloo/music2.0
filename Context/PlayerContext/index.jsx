import { createContext, useState, useRef, useEffect } from "react";
import { message } from "antd";

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
function _loadList() {}
// 获取播放列表
function _getList(musics) {}
// 播放指定的歌曲
function _playMusic(musicId) {}
// 将音乐插入播放列表并立马播放
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
      console.log(originalMusicIndex);
      if (originalMusicIndex !== -1) {
        musics.splice(originalMusicIndex, 1);
      }

      const curMusicIndex = musics.findIndex((item) => item._id === _id);
      musics.splice(curMusicIndex, 0, music);
      setCurMusic(music);
      console.log("[musics]", musics);
      return [...musics];
    });
    return curMusic;
  });
}
// 播放下一首
function _next(curMusic, musics, setCurMusic, setCurState) {
  const { _id: curMusicId } = curMusic;
  const length = musics.length;
  const curMusicIndex = musics.findIndex((item) => item._id === curMusicId);
  if (length && 0 <= curMusicIndex && curMusicIndex <= length - 2) {
    setCurMusic(musics[curMusicIndex + 1]);
    setCurState(true);
  }
  if (length && curMusicIndex === length - 1) {
    message.warn("已经是最后一首了");
  }
}
// 播放上一首
function _prev() {}
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
  useEffect(() => {
    if (canplayState === true) {
      const audio = audioRef.current;
      _play(audio, setCurState, canplayState);
    }
  }, [canplayState]);
}
// 监听音乐加载状态
function useListen(audioRef, setCanPlayState) {
  useEffect(() => {
    const audio = audioRef.current;
    console.dir(audio);
    audio.addEventListener("canplay", () => {
      setCanPlayState(true);
    });
    audio.addEventListener("ended", () => {
      console.log("播放结束");
    });
  }, []);
}

// 等待播放
function waitForPlay(callback) {}

export function PlayerContext({ children }) {
  const [musics, setMusics] = useState([]);
  const [curMusic, setCurMusic] = useState(null);
  const [curState, setCurState] = useState(false);
  const [canplayState, setCanPlayState] = useState(false);
  const audioRef = useRef();
  useListen(audioRef, setCanPlayState);
  useloadMusicAutoPlay(audioRef, setCurState, canplayState);

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
      _next(curMusic, musics, setCurMusic, setCurState);
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
