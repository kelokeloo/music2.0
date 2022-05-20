/**
 *
 * @param {"connect"|"message"} type
 * @param {*} data
 * @returns
 */
export function socketFrame(type, data) {
  return {
    type,
    data,
  };
}

/**
 * data is {type:"" content:""}
 * @param {{type: "text" | "music", content: any}} data
 */

export function DialogMessageFrame(from, to, data, time) {
  return {
    from,
    to,
    data,
    time,
  };
}
