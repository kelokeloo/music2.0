import http from "../http";
/**
 * 获取所有albums
 * @returns res
 */
export async function getAllAlbum() {
  try {
    const res = await http.get("/api/album");
    const { code } = res;
    return res;
  } catch (e) {
    console.log(e);
    return { code: -1, msg: "请求失败" };
  }
}

export async function getAlbumByID(albumId) {
  try {
    const res = await http.get(`/api/album/${albumId}`);
    const { code } = res;
    return res;
  } catch (e) {
    console.log(e);
    return { code: -1, msg: "请求失败" };
  }
}
