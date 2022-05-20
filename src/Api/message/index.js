import http from "../http";

export async function getAllMessages() {
  try {
    const res = await http.get("/api/message");
    const { code } = res;
    return res;
  } catch (e) {
    console.log(e);
    return { code: -1, msg: "请求失败" };
  }
}
export async function readMessage(from, to) {
  try {
    await http.get("/api/message/read", {
      params: {
        from,
        to,
      },
    });
  } catch (e) {
    console.log(e);
    return { code: -1, msg: "请求失败" };
  }
}
