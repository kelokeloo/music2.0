import http from "../http";
import { serverAddress } from "../http";
export async function getAllMemorys() {
  try {
    const result = await http.get("/api/memory");
    const { code, data: momerys } = result;
    if (code === -1) {
      return result;
    }
    result.data = momerys.map((memory) => {
      let { imgList } = memory;
      imgList = imgList.map((img) => {
        return serverAddress + img;
      });
      memory.imgList = imgList;
      return memory;
    });
    return result;
  } catch (e) {
    console.log(e);
    return { code: -1, msg: "请求失败" };
  }
}

/**
 * 获取memory的喜欢列表
 */
export async function getMemoryWhoLike(memoryId) {
  try {
    const result = await http.get("/api/memory/like", {
      params: {
        memoryId,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    return { code: -1, msg: "请求失败" };
  }
}

/**
 * 喜欢memory
 */

export async function setMemoryLike(memoryId, userId) {
  try {
    const result = await http.get("/api/memory/setMemoryLike", {
      params: {
        memoryId,
        userId,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    return { code: -1, msg: "请求失败" };
  }
}

/**
 * 取消喜欢memory
 */

export async function unLikeMemory(memoryId, userId) {
  try {
    const result = await http.get("/api/memory/removeMemoryLike", {
      params: {
        memoryId,
        userId,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    return { code: -1, msg: "请求失败" };
  }
}
