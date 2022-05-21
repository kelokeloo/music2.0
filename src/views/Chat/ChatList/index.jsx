import classes from "./index.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useContext, useState, useEffect } from "react";
import { MessageCtx } from "../../../../Context/MessageContext";
import { ChatItem } from "../../../components/Chat/ChatItem";
import { getUserInfo } from "../../../Api/user";
import { useNavigate } from "react-router-dom";
import { SearchDrawer } from "../SearchDrawer";

function MapChannel(messagesRaw) {
  const userId = sessionStorage.getItem("_id");
  const map = new Map();
  messagesRaw = messagesRaw.filter((message) => {
    if (message.from === userId || message.to === userId) {
      return true;
    } else return false;
  });

  messagesRaw.forEach((msg) => {
    const userId = sessionStorage.getItem("_id");
    const { from, to } = msg;
    let belong = null;
    belong = from === userId ? to : from;
    if (map.has(belong)) {
      const value = map.get(belong);
      value.push(msg);
      map.set(belong, value);
    } else {
      map.set(belong, [msg]);
    }
  });
  return map;
}

function useFetchUser(messagesRaw) {
  const msgMap = MapChannel(messagesRaw);
  const [messages, setMessages] = useState([]);
  async function fetch() {
    let results = await Promise.all(
      Array.from(msgMap).map((item) => {
        const [from, list] = item;
        return getUserInfo(from);
      })
    );
    const users = results.map((item) => {
      return item.data;
    });

    const msgs = Array.from(msgMap).map((item, index) => {
      const [list] = item;
      return {
        belong: users[index],
        messages: item[1],
      };
    });
    setMessages(msgs);
  }
  useEffect(() => {
    fetch();
  }, [messagesRaw]);
  return messages;
}

export function ChatList() {
  const { messages: messagesRaw } = useContext(MessageCtx);
  const [drawerVisible, setDrawerVisible] = useState();
  const messages = useFetchUser(messagesRaw);

  /**
   * 排序
   */
  function MsgsSort() {
    this.sort((a, b) => {
      // a的最近一条消息的时间, b的最近一条消息的时间
      function getLastMsgTime(messages) {
        const length = messages.length;
        if (length === 0) return 0;
        return Number(messages[length - 1].time);
      }
      const timeA = getLastMsgTime(a.messages);
      const timeB = getLastMsgTime(b.messages);
      return timeB - timeA;
    });
    return this;
  }
  messages.MsgsSort = MsgsSort;
  const Navigate = useNavigate();

  function getLatestMsg(item) {
    const { messages: msgs } = item;
    const length = msgs.length;
    return length ? msgs[length - 1] : "";
  }
  function getUnreadMsgCount(item) {
    const { messages: msgs } = item;
    const _id = sessionStorage.getItem("_id");
    let count = 0;
    msgs.forEach((item) => {
      if (item.read === false && item.from !== _id) ++count;
    });
    return count;
  }
  function getUnreadMsgCount(item, from, to) {
    const { messages } = item;
    let count = 0;
    messages.forEach((message) => {
      if (
        message.from === from &&
        message.to === to &&
        message.read === false
      ) {
        count++;
      }
    });
    return count;
  }

  function handleSearchClick() {
    setDrawerVisible(true);
  }
  function handleDrawerClose() {
    setDrawerVisible(false);
  }

  return (
    <div className={classes.box}>
      <header className={classes.header}>
        <SearchOutlined className={classes.icon} onClick={handleSearchClick} />
      </header>
      <div className={classes.content}>
        {messages.MsgsSort().map((item) => {
          const { belong } = item;
          const { img, nickName, _id } = belong;
          return (
            <ChatItem
              fromId={_id}
              img={img}
              nickName={nickName}
              newMessage={getLatestMsg(item)}
              count={getUnreadMsgCount(
                item,
                _id,
                sessionStorage.getItem("_id")
              )}
              key={belong._id}
            ></ChatItem>
          );
        })}
      </div>
      <SearchDrawer
        visible={drawerVisible}
        close={handleDrawerClose}
      ></SearchDrawer>
    </div>
  );
}
