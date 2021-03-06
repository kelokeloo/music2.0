import { Children, createContext, useEffect, useState } from "react";
export const MessageCtx = createContext();
import { getAllMessages } from "../../src/Api/message";
import { socketFrame, DialogMessageFrame } from "../../src/dataStruct";
import { useLocation } from "react-router-dom";
import { readMessage } from "../../src/Api/message";

function useCreateSocket() {
  const [ws, setWs] = useState(null);
  useEffect(() => {
    try {
      const webSocket = new WebSocket("ws://localhost:8081");
      setWs(webSocket);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return ws;
}
function useConnectBind(ws) {
  useEffect(() => {
    if (!ws) return;
    ws.onopen = () => {
      const userId = sessionStorage.getItem("_id");
      ws.send(JSON.stringify(socketFrame("connect", userId)));
    };
  }, [ws]);
}

function useReceiveMsg(ws, setMessages, Location) {
  useEffect(() => {
    if (!ws) return;
    ws.onmessage = ({ data: dataRaw }) => {
      const message = JSON.parse(dataRaw);
      // message is socketFrame
      const { data } = message;
      const { from, to } = data;

      // data is DialogMessage
      // 添加到消息列表当中
      setMessages((messages) => {
        // 判断当前Location
        if (window.location.pathname === `/dialog/${from}`) {
          messages = messages.map((message) => {
            if (message.from === from && message.to === to) message.read = true;
            return message;
          });
          readMessage(from, to);
          data.read = true;
        }
        messages.push(data);
        return [...messages];
      });
    };
  }, [ws]);
}
function _SendMsg(ws, to, data, setMessages) {
  if (!ws) return;
  if (!ws) {
    console.log("[websocket] websocket未创建无法发送");
    return;
  }
  const from = sessionStorage.getItem("_id");
  if (ws.readyState === 1) {
    const time = String(new Date().valueOf());
    const message = DialogMessageFrame(from, to, data, time, false);
    ws.send(JSON.stringify(socketFrame("message", message)));
    setMessages((messages) => {
      messages.push(message);
      return [...messages];
    });
  } else {
    console.log("socket未就绪");
  }
}

// 请求数据
function useFetch(setMessages) {
  useEffect(() => {
    async function fetch() {
      const result = await getAllMessages();
      const { code, data } = result;
      if (code === -1) return setMessages([]);
      setMessages(data);
    }
    fetch();
  }, []);
}

export function MessageContext({ children }) {
  const Location = useLocation();
  const [messages, setMessages] = useState([]);
  useFetch(setMessages);
  // 创建并绑定socket
  const ws = useCreateSocket();
  useConnectBind(ws);
  // 监听消息
  useReceiveMsg(ws, setMessages, Location);
  // privider 的数据
  const CtxValue = {
    messages,
    sendMsg: (ToWho, data) => {
      _SendMsg(ws, ToWho, data, setMessages);
    },
  };

  useEffect(() => {
    console.log("[messages]", messages);
  }, [messages]);

  return <MessageCtx.Provider value={CtxValue}>{children}</MessageCtx.Provider>;
}
