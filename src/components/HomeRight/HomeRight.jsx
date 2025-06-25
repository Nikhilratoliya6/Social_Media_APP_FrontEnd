import React, { useState } from "react";
import PopularUserCard from "./PopularUserCard";
import { Avatar, Card, CardHeader, IconButton, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import SearchUser from "../SearchUser/SearchUser";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const popularUser = [1, 1, 1, 1];

const HomeRight = () => {
  const navigate = useNavigate();
  
  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="sticky top-0 pt-5 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
      <div className="space-y-5">
        {/* Search Component */}
        <div className="bg-white dark:bg-dark-100 rounded-xl shadow-soft">
          <SearchUser handleClick={handleUserClick} />
        </div>

        {/* Suggestions Card */}
        <Card className="bg-white dark:bg-dark-100 rounded-xl shadow-soft overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Suggested for you
              </h3>
              <Button
                endIcon={<ArrowForwardIcon />}
                size="small"
                color="primary"
                className="text-sm"
              >
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {popularUser.map((item, index) => (
                <PopularUserCard
                  key={index}
                  image={item.userImage}
                  username={"code with zosh"}
                  description={"Follows you"}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Footer Links */}
        <div className="px-4 py-3">
          <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:underline">About</a>
            <span>•</span>
            <a href="#" className="hover:underline">Help</a>
            <span>•</span>
            <a href="#" className="hover:underline">Press</a>
            <span>•</span>
            <a href="#" className="hover:underline">API</a>
            <span>•</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms</a>
          </div>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            © 2025 Niktalk from Nikhil Ratoliya
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeRight;
