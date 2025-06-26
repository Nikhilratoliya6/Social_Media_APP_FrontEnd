import React, { useState, useRef, useEffect } from "react";
import { Avatar, IconButton, InputBase, Paper, Tooltip } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../Redux/Message/message.action";
import "./Message.css";

const ChatMessage = ({ message }) => {
  const [content, setContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const typingTimeoutRef = useRef(null);

  const handleCreateMessage = () => {
    if (content.trim()) {
      dispatch(createMessage({ message: content }));
      setContent("");
      setShowEmoji(false);
    }
  };

  const handleTyping = () => {
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCreateMessage();
    } else {
      handleTyping();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Add image upload logic here
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [message]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center backdrop-blur-md bg-opacity-90 bg-gray-900 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <Avatar 
            src={message?.user?.image} 
            className="ring-2 ring-primary-400 ring-offset-2 ring-offset-gray-900"
          />
          <div>
            <p className="font-semibold text-white">
              {message?.user?.firstName} {message?.user?.lastName}
            </p>
            {isTyping ? (
              <div className="flex items-center text-xs text-green-400">
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <span className="ml-2">typing...</span>
              </div>
            ) : (
              <p className="text-xs text-gray-400">
                {message?.user?.isOnline ? "Online" : "Offline"}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Tooltip title="Start video call">
            <IconButton className="text-gray-400 hover:text-primary-400 transition-colors">
              <VideoCallIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More options">
            <IconButton className="text-gray-400 hover:text-primary-400 transition-colors">
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto scrollBar"
      >
        {message?.messages?.map((item) => (
          <div
            key={item.id}
            className={`flex ${
              item.user.id === auth.user.id ? "justify-end" : "justify-start"
            } group`}
          >
            <div
              className={`max-w-[80%] break-words p-3 rounded-2xl shadow-md transition-all duration-200 ${
                item.user.id === auth.user.id
                  ? "bg-primary-500 text-white rounded-tr-none hover:bg-primary-600"
                  : "bg-gray-800 text-white rounded-tl-none hover:bg-gray-700"
              }`}
            >
              <p className="whitespace-pre-wrap">{item.content}</p>
              <div className="flex justify-between items-center mt-1 opacity-0 group-hover:opacity-70 transition-opacity">
                <span className="text-xs">
                  {formatTimestamp(item.timestamp)}
                </span>
                {item.user.id === auth.user.id && (
                  <span className="text-xs ml-2">
                    {item.read ? "Read" : "Sent"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <Paper
          component="form"
          className="flex items-center space-x-2 p-2 bg-gray-800 border border-gray-700 rounded-xl transition-all duration-200 focus-within:border-primary-400"
          sx={{ boxShadow: "none" }}
        >
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <Tooltip title="Attach file">
            <IconButton 
              size="small" 
              className="text-gray-400 hover:text-primary-400"
              component="label"
              htmlFor="image-upload"
            >
              <AttachFileIcon />
            </IconButton>
          </Tooltip>
          <InputBase
            multiline
            maxRows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 text-gray-100"
            sx={{ fontSize: "0.95rem" }}
          />
          <Tooltip title="Add emoji">
            <IconButton 
              size="small" 
              className="text-gray-400 hover:text-primary-400"
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <EmojiEmotionsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send message">
            <IconButton
              size="small"
              className={`${
                content.trim() 
                  ? "text-primary-400 hover:text-primary-500" 
                  : "text-gray-400"
              }`}
              onClick={handleCreateMessage}
              disabled={!content.trim()}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      </div>
    </div>
  );
};

export default ChatMessage;
