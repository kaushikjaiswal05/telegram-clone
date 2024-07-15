import React, { useState } from "react";
import "./sidebar.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AnimationOutlinedIcon from "@mui/icons-material/AnimationOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import ModeIcon from "@mui/icons-material/Mode";
import ChatList from "../chatlist/ChatList";

function Sidebar({ onSelectChat, selectedChatId }) {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [animations, setAnimations] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleAnimations = () => {
    setAnimations(!animations);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="burgerMenu" onClick={toggleOpen}>
          <div className="burgerMenu__line"></div>
          <div className="burgerMenu__line"></div>
          <div className="burgerMenu__line"></div>
        </div>
        <div className="searchBar">
          <SearchIcon className="searchBar__icon" />
          <input type="text" placeholder="Search" className="searchBar__input" />
        </div>
      </div>
      {open && (
        <div className="menu">
          <ul>
            <li>
              <BookmarkBorderIcon className="menu__icon" />
              Saved Messages
            </li>
            <li>
              <RotateRightIcon className="menu__icon" />
              My Stories
            </li>
            <li>
              <PersonOutlineOutlinedIcon className="menu__icon" />
              Contact
            </li>
            <li>
              <SettingsIcon className="menu__icon" />
              Settings
            </li>
            <li>
              <DarkModeOutlinedIcon className="menu__icon" />
              Dark Mode
              <label className="switch">
                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                <span className="slider round"></span>
              </label>
            </li>
            <li>
              <AnimationOutlinedIcon className="menu__icon" />
              Animations
              <label className="switch">
                <input type="checkbox" checked={animations} onChange={toggleAnimations} />
                <span className="slider round"></span>
              </label>
            </li>
            <li>
              <HelpOutlineOutlinedIcon className="menu__icon" />
              Telegram Features
            </li>
            <li>
              <BugReportOutlinedIcon className="menu__icon" />
              Report Bug
            </li>
            <li>
              <span className="menu__icon">A</span>
              Switch to A version
            </li>
            <li>
              <AddCircleOutlineIcon className="menu__icon" />
              Install App
            </li>
          </ul>
          <h2>Telegram WebK 2.1.0 (517)</h2>
        </div>
      )}
      <ChatList onSelectChat={onSelectChat} selectedChatId={selectedChatId} />
      <div className="message">
        <ModeIcon style={{ color: "white" }} />
      </div>
    </div>
  );
}

export default Sidebar;
