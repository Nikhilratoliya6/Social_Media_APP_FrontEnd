import {
  Alert,
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Grid,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RegistrationForm from "./RegisterForm";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Login } from "@mui/icons-material";
import LoginForm from "./LoginForm";
import ResetPasswordRequest from "./ResetPasswordRequest";
import { useSelector } from "react-redux";
import ResetPassword from "./ResetPassword";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import VideocamIcon from '@mui/icons-material/Videocam';

const Authentication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSnakbar, setOpenSnakbar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { auth } = useSelector((store) => store);

  const handleClose = () => {
    setOpenSnakbar(false);
  };

  useEffect(() => {
    if (auth.resetPasswordLink) {
      setOpenSnakbar(true);
    }
  }, [auth.resetPasswordLink]);
  return (
    <div className="h-screen flex">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)' }}></div>
      </div>

      {/* Floating Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.1
            }}
          >
            {i % 4 === 0 ? <FavoriteIcon sx={{ fontSize: 30 }} /> :
             i % 4 === 1 ? <ChatBubbleIcon sx={{ fontSize: 30 }} /> :
             i % 4 === 2 ? <PhotoCameraIcon sx={{ fontSize: 30 }} /> :
             <VideocamIcon sx={{ fontSize: 30 }} />}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="w-full min-h-screen flex items-center justify-center px-4 relative">
        <div className="max-w-md w-full space-y-8">
          {/* Brand */}
          <div className="text-center mb-10 space-y-4">
            <h1 className="text-5xl font-bold text-white mb-2 animate-pulse">
              Niktalk
            </h1>
            <p className="text-xl text-white/80 leading-relaxed animate-fade-in">
              Connect. Share. Inspire.
            </p>
          </div>

          {/* Auth Card */}
          <Card className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 animate-slide-up">
            <div className="space-y-6">
              {isLogin ? <LoginForm /> : <RegistrationForm />}
              
              <div className="text-center mt-4">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center justify-center gap-2 mx-auto group"
                >
                  {isLogin ? "New to Niktalk? Create account" : "Already have an account? Login"}
                  <ArrowForwardIcon className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-8 animate-fade-in">
            <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
              <PhotoCameraIcon className="text-white mb-2" />
              <p className="text-white/80 text-sm">Share Moments</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
              <ChatBubbleIcon className="text-white mb-2" />
              <p className="text-white/80 text-sm">Real-time Chat</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
              <VideocamIcon className="text-white mb-2" />
              <p className="text-white/80 text-sm">Live Videos</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
              <FavoriteIcon className="text-white mb-2" />
              <p className="text-white/80 text-sm">Connect Friends</p>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnakbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {auth.resetPasswordLink}
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={auth.loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Authentication;
