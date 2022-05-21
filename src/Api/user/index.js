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

/**
 * 获取用户关注列表
 */

export async function getUserFocus(userId) {
  try {
    const result = await http.get("/api/user/focus", {
      params: {
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
 * 关注用户, 返回true表示成功， false表示失败
 */
export async function addFocus(userId, focusId) {
  try {
    const result = await http.get("/api/user/addfocus", {
      params: { userId, focusId },
    });
    const { code } = result;
    if (code !== -1) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * 取消关注用户, 返回true表示成功， false表示失败
 */
export async function cancelFocus(userId, focusId) {
  try {
    const result = await http.get("/api/user/cancelfocus", {
      params: { userId, focusId },
    });
    const { code } = result;
    if (code !== -1) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}
