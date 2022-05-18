import http from "../http";

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
