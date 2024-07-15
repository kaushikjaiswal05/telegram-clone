import React, { useEffect, useState } from "react";
import axios from "axios";
import "./chatlist.css";

const ChatList = ({ onSelectChat, selectedChatId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          "https://devapi.beyondchats.com/api/get_all_chats?page=1"
        );
        console.log("API Response:", response.data);
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.data)
        ) {
          setChats(response.data.data.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="chatList">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`chatListItem ${
            selectedChatId === chat.id ? "selected" : ""
          }`}
          onClick={() => onSelectChat(chat.id)}
        >
          <div
            className="chatListItem__avatar"
            style={{ backgroundColor: getRandomColor() }}
          >
            {chat.creator && chat.creator.name ? (
              <div>{chat.creator.name.charAt(0)}</div>
            ) : (
              <div>?</div>
            )}
          </div>
          <div className="chatListItem__details">
            <div className="chatListItem__name">
              {chat.creator && chat.creator.name
                ? chat.creator.name
                : "Unknown"}
            </div>
            <div className="chatListItem__lastSeen">
              {chat.updated_at
                ? `last seen ${formatDate(chat.updated_at)}`
                : ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
