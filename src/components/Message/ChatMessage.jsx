import React, { useState, useRef, useEffect } from "react";
import { Avatar, IconButton, InputBase, Paper, Badge } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { useDispatch, useSelector } from "react-redux";
import "./Message.css";
import { createMessage } from "../../Redux/Message/message.action";
import webSocketService from "../../utils/webSocketService";
import EmojiPicker from "emoji-picker-react";

const ChatMessage = ({ message, onImageSelect }) => {
  const [content, setContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [showEmoji, setShowEmoji] = useState(false);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (message?.id && auth.jwt) {
      // Subscribe to chat-specific messages
      const chatSubscription = webSocketService.subscribe(
        `/chat/${message.id}/messages`,
        (newMessage) => {
          dispatch({
            type: "NEW_MESSAGE_RECEIVED",
            payload: newMessage
          });
          scrollToBottom();
        }
      );

      // Subscribe to online status updates
      const onlineSubscription = webSocketService.subscribe(
        '/topic/online-users',
        (users) => {
          setOnlineUsers(new Set(users));
        }
      );

      // Subscribe to typing indicators
      const typingSubscription = webSocketService.subscribe(
        `/chat/${message.id}/typing`,
        (data) => {
          if (data.userId !== auth.user.id) {
            setIsTyping(true);
            if (typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => {
              setIsTyping(false);
            }, 2000);
          }
        }
      );

      // Send online status
      webSocketService.sendMessage('/app/online-status', {
        userId: auth.user.id,
        status: 'ONLINE'
      });

      return () => {
        chatSubscription?.unsubscribe();
        typingSubscription?.unsubscribe();
        onlineSubscription?.unsubscribe();
        webSocketService.sendMessage('/app/online-status', {
          userId: auth.user.id,
          status: 'OFFLINE'
        });
      };
    }
  }, [message?.id, auth.jwt, auth.user.id]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleCreateMessage = async () => {
    if (!content.trim()) return;

    try {
      await webSocketService.sendMessage(`/app/chat/${message.id}/send`, {
        content: content.trim(),
        chatId: message.id,
        userId: auth.user.id,
        type: 'TEXT'
      });

      setContent("");
      setShowEmoji(false);
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send message:", error);
      // Fallback to HTTP if WebSocket fails
      dispatch(createMessage({
        content: content.trim(),
        chatId: message.id,
        type: 'TEXT'
      }));
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const mediaUrl = await onImageSelect(event);
      if (mediaUrl) {
        await webSocketService.sendMessage(`/app/chat/${message.id}/send`, {
          content: mediaUrl,
          chatId: message.id,
          userId: auth.user.id,
          type: file.type.startsWith('image/') ? 'IMAGE' : 'FILE'
        });
        scrollToBottom();
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  const handleTyping = () => {
    try {
      webSocketService.sendMessage(`/app/chat/${message.id}/typing`, {
        userId: auth.user.id,
        typing: true
      });
    } catch (error) {
      console.error("Failed to send typing indicator:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCreateMessage();
    } else {
      handleTyping();
    }
  };

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
    <div className="h-full flex flex-col bg-gray-900">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800/90 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            color={message?.user?.isOnline ? "success" : "error"}
          >
            <Avatar 
              src={message?.user?.image} 
              className="ring-2 ring-primary-400 ring-offset-2 ring-offset-gray-800"
            />
          </Badge>
          <div>
            <p className="font-semibold text-primary-300">
              {message?.user?.firstName} {message?.user?.lastName}
            </p>
            {isTyping ? (
              <div className="flex items-center text-xs text-emerald-400">
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <span className="ml-2">typing...</span>
              </div>
            ) : (
              <p className="text-xs text-secondary-300">
                {message?.user?.isOnline ? "Online" : "Offline"}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <IconButton className="text-primary-300 hover:text-primary-400 transition-colors">
            <VideoCallIcon />
          </IconButton>
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
              className={`max-w-[80%] break-words p-3 rounded-2xl ${
                item.user.id === auth.user.id
                  ? "bg-primary-600/80 text-gray-100 rounded-tr-none hover:bg-primary-600"
                  : "bg-secondary-600/80 text-gray-100 rounded-tl-none hover:bg-secondary-600"
              } shadow-lg transition-all duration-200`}
            >
              <p className="whitespace-pre-wrap">{item.content}</p>
              <div className="flex justify-between items-center mt-1 opacity-0 group-hover:opacity-70 transition-opacity">
                <span className="text-xs text-gray-300">
                  {formatTimestamp(item.timestamp)}
                </span>
                {item.user.id === auth.user.id && (
                  <span className="text-xs ml-2 text-emerald-300">
                    {item.read ? "✓✓" : "✓"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <Paper
          component="form"
          className="flex items-center space-x-2 p-2 bg-gray-700/50 border border-gray-600 rounded-xl"
          sx={{ boxShadow: "none" }}
        >
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={onImageSelect}
          />
          <IconButton 
            size="small" 
            className="text-primary-300 hover:text-primary-400"
            component="label"
            htmlFor="image-upload"
          >
            <AttachFileIcon />
          </IconButton>
          <InputBase
            multiline
            maxRows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 text-gray-100 placeholder-gray-400"
            sx={{ 
              fontSize: "0.95rem",
              "& .MuiInputBase-input": {
                color: "rgb(243, 244, 246)"
              }
            }}
          />
          <IconButton 
            size="small" 
            className="text-secondary-300 hover:text-secondary-400"
            onClick={() => setShowEmoji(!showEmoji)}
          >
            <EmojiEmotionsIcon />
          </IconButton>
          <IconButton
            size="small"
            className={`${
              content.trim() 
                ? "text-primary-400 hover:text-primary-500" 
                : "text-gray-500"
            } transition-colors`}
            onClick={handleCreateMessage}
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
