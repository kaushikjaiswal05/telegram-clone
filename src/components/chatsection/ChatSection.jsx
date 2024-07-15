import React, { useEffect, useState } from "react";
import axios from "axios";
import "./chatsection.css";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ChatSection = ({ selectedChatId, onBack, isMobile }) => {
  const [messages, setMessages] = useState([]);
  const [chatDetails, setChatDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log(`Fetching messages for chat ID: ${selectedChatId}`);
        const response = await axios.get(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${selectedChatId}`
        );
        console.log("Messages API Response:", response.data);
        setMessages(response.data.data);
      } catch (err) {
        console.error("Error fetching messages:", err.message);
        setError(err.message);
      }
    };

    const fetchChatDetails = async () => {
      try {
        console.log(`Fetching chat details`);
        const response = await axios.get(
          `https://devapi.beyondchats.com/api/get_all_chats?page=1`
        );
        console.log("Chats API Response:", response.data);
        const chat = response.data.data.data.find(
          (chat) => chat.id === selectedChatId
        );
        if (chat) {
          setChatDetails(chat);
        } else {
          setError("Chat not found");
        }
      } catch (err) {
        console.error("Error fetching chat details:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedChatId) {
      fetchMessages();
      fetchChatDetails();
    } else {
      setLoading(false);
    }
  }, [selectedChatId]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    console.log("Send message:", newMessage);
    setNewMessage("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="chatSection">
      {chatDetails && (
        <div className="chatSection__header">
          {isMobile && <ArrowBackIcon className="backButton" onClick={onBack} />}
          <div
            className="chatSection__avatar"
            style={{
              backgroundColor: chatDetails.creator ? getRandomColor() : "gray",
            }}
          >
            {chatDetails.creator ? chatDetails.creator.name.charAt(0) : "?"}
          </div>
          <div className="chatSection__details">
            <div className="chatSection__name">
              {chatDetails.creator ? chatDetails.creator.name : "Unknown"}
            </div>
            <div className="chatSection__status">
              {chatDetails.updated_at
                ? `last seen ${new Date(
                    chatDetails.updated_at
                  ).toLocaleDateString()}`
                : ""}
            </div>
          </div>
          <div className="features">
            <LocalPhoneOutlinedIcon />
            <SearchOutlinedIcon />
            <MoreVertOutlinedIcon />
          </div>
        </div>
      )}
      <div className="chatSection__messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chatMessage ${
              msg.sender_id === 1 ? "received" : "sent"
            }`}
          >
            <div className="messageContent">{msg.message}</div>
          </div>
        ))}
      </div>
      <div className="chatSection__input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatSection;
