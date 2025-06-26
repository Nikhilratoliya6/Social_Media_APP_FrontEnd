import React from 'react';
import { IconButton, Typography, Tooltip, Badge } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
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
    { 
      icon: <Badge badgeContent={3} color="primary"><NotificationsIcon /></Badge>, 
      label: 'Activity', 
      path: '/activity' 
    },
    { icon: <PersonOutlineIcon />, label: 'Profile', path: `/profile/${auth.user?.id}` },
  ];

  return (
    <footer className="block fixed bottom-0 left-0 w-full sm:hidden backdrop-blur-lg bg-black/80 border-t border-gray-800 py-2 px-4 z-40">
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
                className={`text-xl transition-all duration-200 ${
                  location.pathname === item.path 
                    ? 'text-primary-500 transform scale-105' 
                    : 'text-gray-400 hover:text-white'
                }`}
                sx={{
                  padding: '6px',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.05)',
                  },
                }}
              >
                {item.icon}
              </IconButton>
              <Typography 
                variant="caption" 
                className={`mt-0.5 text-[10px] ${
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
