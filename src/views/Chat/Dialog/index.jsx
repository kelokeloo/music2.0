import { useParams } from "react-router-dom";
import { ComHeader } from "../../../components/Header";
import classes from "./index.module.scss";
import { useRef, useEffect, useContext, useState } from "react";
import { MessageBox } from "../../../components/Chat/MessageBox";
import { MsgInput } from "../../../components/Chat/MsgInput";
import { MessageCtx } from "../../../../Context/MessageContext";
import { getUserInfo } from "../../../Api/user";

/**
 *
 * @param {"text"|"music"} type
 * @param {any} content
 * @returns
 */
function dataFrame(type, content) {
  return {
    type,
    content,
  };
}

function GotoButtom(contentRef) {
  if (contentRef.current) {
    contentRef.current.scrollTop = contentRef.current.scrollHeight;
  }
}

function useToBottom(contentRef, messagesRaw) {
  useEffect(() => {
    GotoButtom(contentRef);
  }, [messagesRaw]);
}

function MsgFilter(messagesRaw, fromId) {
  return messagesRaw.filter((message) => {
    const { from, to } = message;
    const userId = sessionStorage.getItem("_id");
    if (
      (from === fromId && to === userId) ||
      (to === fromId && from === userId)
    ) {
      return true;
    }
    return false;
  });
}

function useGetUser(userId) {
  const [user, setUser] = useState(null);
  async function fetch() {
    const result = await getUserInfo(userId);
    const { code, data } = result;
    if (code === -1) {
      setUser(null);
      return;
    }
    setUser(data);
  }
  useEffect(() => {
    fetch();
  }, []);
  return user;
}

export function Dialog() {
  const { fromId } = useParams();
  const curUserId = sessionStorage.getItem("_id");
  const contentRef = useRef();
  const { messages: messagesRaw, sendMsg } = useContext(MessageCtx);
  const messages = MsgFilter(messagesRaw, fromId);
  useToBottom(contentRef, messagesRaw);

  const fromUser = useGetUser(fromId);
  const curUser = useGetUser(curUserId);
  function handleSend(content) {
    const data = dataFrame("text", content);
    sendMsg(fromId, data);
    setTimeout(() => {
      GotoButtom(contentRef);
    });
  }

  return (
    <div className={classes.box}>
      <div className={classes.header}>
        <ComHeader></ComHeader>
      </div>
      <div className={classes.wrapper} ref={contentRef}>
        <div className={classes.content}>
          {messages.map((message, index) => {
            return message.from === fromId ? (
              <MessageBox
                position="left"
                username={fromUser ? fromUser.nickName : "name"}
                img={fromUser ? fromUser.img : ""}
                time={message.time}
                content={message.data.content}
                key={index}
              ></MessageBox>
            ) : (
              <MessageBox
                position="right"
                username={curUser ? curUser.nickName : "name"}
                img={curUser ? curUser.img : ""}
                time={message.time}
                key={index}
                content={message.data.content}
              ></MessageBox>
            );
          })}
        </div>
      </div>
      <div className={classes.input}>
        <MsgInput send={handleSend}></MsgInput>
      </div>
    </div>
  );
}
