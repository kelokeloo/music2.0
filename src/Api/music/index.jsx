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

/**
 * 根据指定歌手，获取该歌手的所有音乐
 */

export async function getMusicsBySinger(singer) {
  try {
    const res = await http.get("/api/music/singer", {
      params: {
        singer,
      },
    });
    let { code, data } = res;
    if (code === -1) return res;
    // 添加baseUrl
    data = data.map((music) => {
      music.img = serverAddress + music.img;
      music.source = serverAddress + music.source;
      return music;
    });
    res.data = data;

    return res;
  } catch (e) {
    return { code: -1, msg: "请求失败" };
  }
}
