import http from "../http";
import { serverAddress } from "../http";

/**
 * 添加因此的喜欢次数
 */
export async function addMusicCount(musicId) {
  try {
    const res = await http.get("/api/music/addmusiccount", {
      params: {
        musicId,
      },
    });
    const { code } = res;
    return res;
  } catch (e) {
    return { code: -1, msg: "请求失败" };
  }
}

/**
 * 获取音乐信息
 */
export async function getMusicById(musicId) {
  try {
    const res = await http.get("/api/music/id", {
      params: {
        musicId,
      },
    });
    const { code } = res;
    if (code === -1) return res;
    const {
      data: { musicInfo },
    } = res;
    musicInfo.img = serverAddress + musicInfo.img;
    musicInfo.source = serverAddress + musicInfo.source;
    res.data.musicInfo = musicInfo;

    return res;
  } catch (e) {
    return { code: -1, msg: "请求失败" };
  }
}
