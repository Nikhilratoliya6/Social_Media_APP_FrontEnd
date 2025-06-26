import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState, useCallback, useRef } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import ChatMessage from "../../components/Message/ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import {
  createChat,
  getAllChats,
} from "../../Redux/Message/message.action";
import UserChatCard from "../../components/Message/UserChatCard";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from "../../utis/uploadToCloudniry";
import "./Message.css";
import SearchUser from "../../components/SearchUser/SearchUser";
import SockJS from "sockjs-client";
import Stomp from 'stompjs';

const SOCKET_URL = "https://socialmediaappbackend-production-8a21.up.railway.app/ws";
const RECONNECT_DELAY = 5000;

const Message = () => {
  const dispatch = useDispatch();
  const { chat, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const reconnectTimeoutRef = useRef(null);

  const connectToWebSocket = useCallback(() => {
    if (isConnecting || !auth.jwt) return;

    setIsConnecting(true);
    try {
      const sock = new SockJS(SOCKET_URL);
      const stomp = Stomp.over(sock);

      // Disable debug logging
      stomp.debug = null;

      const headers = {
        Authorization: `Bearer ${auth.jwt}`,
      };

      stomp.connect(
        headers,
        () => {
          console.log("WebSocket Connected");
          setStompClient(stomp);
          setIsConnecting(false);

          // Subscribe to user-specific topic
          if (auth.user?.id) {
            stomp.subscribe(`/user/${auth.user.id}/queue/messages`, (message) => {
              const receivedMessage = JSON.parse(message.body);
              // Handle received message
              if (currentChat?.id === receivedMessage.chatId) {
                dispatch({
                  type: "NEW_MESSAGE_RECEIVED",
                  payload: receivedMessage,
                });
              }
            });
          }
        },
        (error) => {
          console.error("WebSocket Connection Error:", error);
          setIsConnecting(false);
          
          // Clear any existing reconnection timeout
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
          }

          // Attempt to reconnect after delay
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("Attempting to reconnect...");
            connectToWebSocket();
          }, RECONNECT_DELAY);
        }
      );
    } catch (error) {
      console.error("WebSocket Setup Error:", error);
      setIsConnecting(false);
    }
  }, [auth.jwt, auth.user?.id, currentChat?.id, dispatch, isConnecting]);

  useEffect(() => {
    connectToWebSocket();

    return () => {
      // Cleanup function
      if (stompClient?.connected) {
        stompClient.disconnect();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectToWebSocket]);

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  const handleSelectImage = async (event) => {
    setLoading(true);
    try {
      const imgUrl = await uploadToCloudinary(event.target.files[0], "image");
      setLoading(false);
      return imgUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      setLoading(false);
      return null;
    }
  };

  const handleCreateChat = (userId) => {
    dispatch(createChat({ userId }));
  };

  const handleChatSelection = (selectedChat) => {
    setCurrentChat(selectedChat);
    // Update the selected state in the chat list
    const updatedChats = chat.chats?.map(chat => ({
      ...chat,
      isSelected: chat.id === selectedChat.id
    }));
    dispatch({ type: "SET_CHATS", payload: updatedChats });
  };

  return (
    <div className="h-screen bg-gray-900 text-gray-100">
      <Grid container className="h-full">
        {/* Left Sidebar - Chat List */}
        <Grid item xs={12} sm={4} md={3} className="border-r border-gray-700 h-full">
          <div className="p-4 bg-gray-800 sticky top-0 z-10">
            <h1 className="text-xl font-semibold text-primary-300 mb-4">Messages</h1>
            <SearchUser handleCreateChat={handleCreateChat} />
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-80px)] scrollBar">
            {chat.chats?.map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleChatSelection(item)}
                className="cursor-pointer"
              >
                <UserChatCard chat={item} />
              </div>
            ))}
            {chat.chats?.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ChatBubbleOutlineIcon className="text-5xl mb-2" />
                <p>No conversations yet</p>
              </div>
            )}
          </div>
        </Grid>

        {/* Right Side - Chat Messages */}
        <Grid item xs={12} sm={8} md={9} className="h-full">
          {currentChat ? (
            <ChatMessage 
              message={currentChat} 
              onImageSelect={handleSelectImage}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <VideocamIcon className="text-6xl mb-4" />
              <p className="text-lg mb-2">Welcome to Messages</p>
              <p className="text-sm">Select a chat to start messaging</p>
            </div>
          )}
        </Grid>
      </Grid>

      <Backdrop open={loading} sx={{ color: '#fff', zIndex: 999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
