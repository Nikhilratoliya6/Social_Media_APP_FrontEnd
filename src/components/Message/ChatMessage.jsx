import React, { useState, useRef, useEffect } from "react";
import { Avatar, IconButton, InputBase, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MicIcon from "@mui/icons-material/Mic";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import "./Message.css";
import EmojiPicker from "emoji-picker-react";
import { createMessage } from "../../Redux/Message/message.action";

const ChatMessage = ({ message }) => {
  const [content, setContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleCreateMessage = () => {
    if (content.trim()) {
      dispatch(createMessage({ message: content }));
      setContent("");
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCreateMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [message]);

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gradient-to-r from-gray-900 to-black">
        <div className="flex items-center space-x-3">
          <Avatar src={message?.user?.image} />
          <div>
            <p className="font-semibold text-white">
              {message?.user?.firstName + " " + message?.user?.lastName}
            </p>
            {isTyping && <p className="text-xs text-green-500">typing...</p>}
          </div>
        </div>
        <div className="flex space-x-3">
          <IconButton size="small" className="text-gray-400">
            <MicIcon />
          </IconButton>
          <IconButton size="small" className="text-gray-400">
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-gray-900 to-black"
      >
        {message?.messages?.map((item) => (
          <div
            key={item.id}
            className={`flex ${
              item.user.id === auth.user.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] break-words p-3 rounded-2xl ${
                item.user.id === auth.user.id
                  ? "bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-tr-none"
                  : "bg-gray-800 text-white rounded-tl-none"
              }`}
            >
              <p>{item.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(item.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-900">
        {showEmoji && (
          <div className="absolute bottom-20 right-4">
            <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
          </div>
        )}
        <Paper
          component="form"
          className="flex items-center space-x-2 p-2 bg-gray-800 border border-gray-700"
          sx={{ boxShadow: "none" }}
        >
          <IconButton
            size="small"
            onClick={() => setShowEmoji(!showEmoji)}
            className="text-gray-400"
          >
            <EmojiEmotionsIcon />
          </IconButton>
          <IconButton size="small" className="text-gray-400">
            <ImageIcon />
          </IconButton>
          <InputBase
            className="flex-1 text-white"
            placeholder="Type a message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
          />
          <IconButton
            size="small"
            onClick={handleCreateMessage}
            className="text-pink-500"
            disabled={!content.trim()}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
};

export default ChatMessage;
