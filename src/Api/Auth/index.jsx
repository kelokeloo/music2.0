import http from "../http";
const baseUrl = "/api/auth";
export async function login(account, password, Callback) {
  const url = baseUrl + "/login";
  const result = await http.post(url, {
    account,
    password,
  });
  Callback(result);
}
export async function signUp(account, nickName, password, Callback) {
  const url = baseUrl + "/signUp";
  const result = await http.post(url, {
    account,
    nickName,
    password,
  });
  Callback(result);
}
