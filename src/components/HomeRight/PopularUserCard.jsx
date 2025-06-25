import { Avatar, Button } from '@mui/material';
import React, { useState } from 'react';

const PopularUserCard = ({ image, username, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div 
      className="flex justify-between items-center p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-dark-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-3">
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: "primary.main",
            transition: "transform 0.2s",
            transform: isHovered ? "scale(1.05)" : "scale(1)"
          }}
          src={image}
          alt={username}
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">
            {username}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>

      <Button
        variant={isFollowing ? "outlined" : "contained"}
        size="small"
        color="primary"
        onClick={handleFollowClick}
        className={`min-w-[80px] transition-all duration-200 ${
          isFollowing 
            ? 'hover:bg-red-50 hover:text-red-600 hover:border-red-600 dark:hover:bg-red-900/20' 
            : ''
        }`}
      >
        {isFollowing ? (
          isHovered ? "Unfollow" : "Following"
        ) : (
          "Follow"
        )}
      </Button>
    </div>
  );
};

export default PopularUserCard;