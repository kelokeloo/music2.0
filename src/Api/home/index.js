import http from "../http";
import { serverAddress } from "../http";

/**
 * 获取首页热门数据
 */
export async function getLikeData() {
  try {
    const res = await http.get("/api/home/recommend");
    const data = res.data;
    data.map((music) => {
      music.img = serverAddress + music.img;
      music.source = serverAddress + music.source;
    });
    res.data = data;
    return res;
  } catch (e) {
    console.error(e);
    return { code: -1, msg: "请求失败" };
  }
}
