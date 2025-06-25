import { Card, Grid, IconButton } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MiddlePart from "./MiddlePart";
import HomeRight from "../../components/HomeRight/HomeRight";
import { Route, Routes, useLocation } from "react-router-dom";
import Reels from "../Reels/Reels";
import Profile from "../Profile/Profile";
import CreatePostModal from "../../components/CreatePost/CreatePostModal";
import { useSelector } from "react-redux";
import Authentication from "../Authentication/Authentication";
import CreateReelsForm from "../Reels/CreateReelsForm";
import MenuIcon from "@mui/icons-material/Menu";

const HomePage = () => {
  const location = useLocation();
  const { auth } = useSelector(store => store);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-200">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white dark:bg-dark-100 shadow-sm">
        <span className="text-2xl font-bold text-primary-600">Niktalk</span>
        <IconButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-600 dark:text-gray-300"
        >
          <MenuIcon />
        </IconButton>
      </div>

      <div className={`
        fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300
        ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        lg:hidden
      `} onClick={() => setMobileMenuOpen(false)} />

      <div className="container mx-auto px-4 lg:px-8 pt-16 lg:pt-0">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3} className="hidden lg:block">
            <div className="sticky top-0">
              <Sidebar />
            </div>
          </Grid>

          {/* Mobile Sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-100 transform transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:hidden
          `}>
            <Sidebar />
          </div>

          <Grid 
            item 
            xs={12} 
            lg={location.pathname === "/" ? 6 : 9}
            className="transition-all duration-300"
          >
            <div className="max-w-3xl mx-auto">
              <Routes>
                <Route path="/" element={<MiddlePart />} />
                <Route path="/reels" element={<Reels />} />
                <Route path="/create-reels" element={<CreateReelsForm />} />
                <Route path="/profile/:id" element={<Profile />} />
              </Routes>
            </div>
          </Grid>

          {location.pathname === "/" && (
            <Grid item xs={12} lg={3} className="hidden lg:block">
              <div className="sticky top-0">
                <HomeRight />
              </div>
            </Grid>
          )}
        </Grid>
      </div>
      <CreatePostModal />
    </div>
  );
};

export default HomePage;
