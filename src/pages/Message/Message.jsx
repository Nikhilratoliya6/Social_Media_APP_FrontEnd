import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import WestIcon from "@mui/icons-material/West";
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
import { searchUser } from "../../Redux/Auth/auth.action";
import SearchUser from "../../components/SearchUser/SearchUser";
import SockJS from "sockjs-client";
import Stomp from 'stompjs';

const Message = () => {
  const dispatch = useDispatch();
  const { chat, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  const handleSelectImage = async (event) => {
    setLoading(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0], "image");
    setLoading(false);
    return imgUrl;
  };

  const handleCreateChat = (userId) => {
    dispatch(createChat({ userId }));
  };

  const onConnect = (frame) => {
    console.log("Connected: ", frame);
  };

  const onError = (err) => {
    console.log("Error: ", err);
  };

  useEffect(() => {
    const sock = new SockJS("https://socialmediaappbackend-production-8a21.up.railway.app/ws");
    const stomp = Stomp.over(sock);
    setStompClient(stomp);
    stomp.connect({}, onConnect, onError);

    return () => {
      if (stomp) {
        stomp.disconnect();
      }
    };
  }, []);

  return (
    <div className="h-screen bg-gray-900 text-gray-100">
      <Grid container className="h-full">
        {/* Left Sidebar - Chat List */}
        <Grid item xs={12} sm={4} md={3} className="border-r border-gray-700 h-full">
          <div className="p-4 bg-gray-800 sticky top-0 z-10">
            <h1 className="text-xl font-semibold text-primary-300 mb-4">Messages</h1>
            <SearchUser />
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-80px)] scrollBar">
            {chat.chats?.map((item) => (
              <div key={item.id} onClick={() => setCurrentChat(item)}>
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
