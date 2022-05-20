import http from "../http";
import { serverAddress } from "../http";
export async function search(keyword) {
  try {
    const result = await http.get("/api/search", {
      params: {
        keyword,
      },
    });
    let { code, data } = result;
    if (code === -1) return result;
    data = data.map((item) => {
      if (item.append.type === "music") {
        item.img = serverAddress + item.img;
        item.source = serverAddress + item.source;
      }
      return item;
    });
    result.data = data;
    // 数据处理 添加baseUrl
    return result;
  } catch (e) {
    console.log(e);
    return { code: -1, msg: "请求失败" };
  }
}
