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

export function DialogMessageFrame(from, to, data, time, read) {
  return {
    from,
    to,
    data,
    time,
    read,
  };
}

export function CommentFrame(content, from, time, to) {
  return {
    content,
    from,
    time,
    to,
  };
}
