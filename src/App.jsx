import React, { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import ChatSection from "./components/chatsection/ChatSection";
import "./App.css";
import axios from "axios";

function App() {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          "https://devapi.beyondchats.com/api/get_all_chats?page=1"
        );
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.data) &&
          response.data.data.data.length > 0
        ) {
          setSelectedChatId(response.data.data.data[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch chats:", err);
      }
    };

    fetchChats();
  }, []);

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="app">
      {isMobile ? (
        selectedChatId ? (
          <ChatSection selectedChatId={selectedChatId} />
        ) : (
          <Sidebar onSelectChat={handleSelectChat} selectedChatId={selectedChatId} />
        )
      ) : (
        <>
          <Sidebar onSelectChat={handleSelectChat} selectedChatId={selectedChatId} />
          <ChatSection selectedChatId={selectedChatId} />
        </>
      )}
    </div>
  );
}

export default App;
