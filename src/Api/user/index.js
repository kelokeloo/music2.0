import http from "../http";
import { serverAddress } from "../http";

export async function getUserInfo(userId) {
  try {
    const result = await http.get("/api/user/userinfo", {
      params: {
        userId,
      },
    });
    const { code, data: userInfo } = result;
    if (code === -1) return result;
    userInfo.img = serverAddress + userInfo.img;
    result.data = userInfo;
    return result;
  } catch (e) {
    console.log(e);
    return { code: -1, msg: "请求失败" };
  }
}

/**
 * 搜索用户
 */
export async function searchUser(value) {
  try {
    const result = await http.get("/api/user/searchuser", {
      params: {
        value,
      },
    });
    let { code, data } = result;
    if (code === -1) return result;
    data = data.map((user) => {
      user.img = serverAddress + user.img;
      return user;
    });
    result.data = data;
    return result;
  } catch (e) {
    console.log(e);
    return { code: -1, msg: "请求失败" };
  }
}
