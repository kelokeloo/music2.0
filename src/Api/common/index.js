import http from "../http";
export async function isUserLikeMusic(userId, musicId) {
  try {
    const res = await http.post("/api/user/musiclike", {
      userId,
      musicId,
    });
    return res;
  } catch (e) {
    console.error(e);
    return { code: -1, msg: "请求失败" };
  }
}

export async function setUserLikeMusic(userId, musicId) {
  try {
    const res = await http.post("/api/user/addmusictolikes", {
      userId,
      musicId,
    });
    return res;
  } catch (e) {
    console.error(e);
    return { code: -1, msg: "设置失败" };
  }
}

export async function setUserDisLikeMusic(userId, musicId) {
  try {
    const res = await http.post("/api/user/removemusictolikes", {
      userId,
      musicId,
    });
    return res;
  } catch (e) {
    console.error(e);
    return { code: -1, msg: "设置失败" };
  }
}
