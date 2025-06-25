import React from 'react';
import { IconButton, Typography, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  
  const footerItems = [
    { icon: <HomeIcon />, label: 'Home', path: '/' },
    { icon: <SearchIcon />, label: 'Search', path: '/search' },
    { icon: <AddBoxOutlinedIcon />, label: 'Create', path: '/create' },
    { icon: <FavoriteBorderIcon />, label: 'Activity', path: '/activity' },
    { icon: <PersonOutlineIcon />, label: 'Profile', path: `/profile/${auth.user?.id}` },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full md:hidden backdrop-blur-lg bg-black/80 border-t border-gray-800 py-3 px-4 z-50">
      <div className="flex justify-between items-center max-w-screen-sm mx-auto">
        {footerItems.map((item) => (
          <Tooltip 
            key={item.label} 
            title={item.label} 
            placement="top" 
            arrow
          >
            <div className="flex flex-col items-center">
              <IconButton
                onClick={() => navigate(item.path)}
                className={`text-2xl transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'text-primary-500 transform scale-110' 
                    : 'text-gray-400 hover:text-white'
                }`}
                sx={{
                  padding: '8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {item.icon}
              </IconButton>
              <Typography 
                variant="caption" 
                className={`mt-0.5 text-xs ${
                  location.pathname === item.path 
                    ? 'text-primary-500' 
                    : 'text-gray-500'
                }`}
                style={{ fontFamily: 'Space Grotesk' }}
              >
                {item.label}
              </Typography>
            </div>
          </Tooltip>
        ))}
      </div>

      {/* Gradient line at the top of footer */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
    </footer>
  );
};

export default Footer;
