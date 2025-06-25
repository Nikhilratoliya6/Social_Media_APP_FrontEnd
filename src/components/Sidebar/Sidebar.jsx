import React, { useState } from "react";
import { Avatar, Button, Divider, Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate, useLocation } from "react-router-dom";
import { navigationMenu } from "./NavigationMenu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Auth/auth.action";
import "./SideBar.css";
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import Badge from '@mui/material/Badge';

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showTooltips, setShowTooltips] = useState(false);
  const openLogoutMenu = Boolean(anchorEl);
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleOpenLogoutMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/");
  };
  return (
    <div className="relative h-screen flex flex-col justify-between py-5 border-r border-gray-800 bg-gradient-to-b from-black to-gray-900">
      {/* Logo Section */}
      <div className="px-5">
        <h1 
          className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent" 
          style={{ fontFamily: 'Abril Fatface' }}
        >
          Niktalk
        </h1>

        {/* Navigation Items */}
        <div className="space-y-1">
          {navigationMenu.map((item) => (
            <Tooltip 
              key={item.title}
              title={item.title}
              placement="right"
              arrow
              enterDelay={500}
            >
              <div
                onClick={() => {
                  item.title === "Profile"
                    ? navigate(`/profile/${auth.user.id}`)
                    : navigate(`${item.path}`);
                }}
                className={`flex items-center p-3 cursor-pointer rounded-xl transition-all duration-200 group
                  ${location.pathname === item.path 
                    ? 'bg-gray-800 bg-opacity-50' 
                    : 'hover:bg-gray-800 hover:bg-opacity-30'}`}
              >
                <div className={`text-2xl ${location.pathname === item.path 
                  ? 'text-primary-500' 
                  : 'text-gray-400 group-hover:text-white'}`}>
                  {item.icon}
                </div>
                <span className={`ml-3 font-medium tracking-wide ${location.pathname === item.path 
                  ? 'text-white' 
                  : 'text-gray-400 group-hover:text-white'}`} 
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  {item.title}
                </span>
              </div>
            </Tooltip>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-8 space-y-2">
          <Tooltip title="Notifications" placement="right" arrow>
            <div className="flex items-center p-3 cursor-pointer rounded-xl hover:bg-gray-800 transition-all duration-200 group">
              <Badge badgeContent={3} color="primary">
                <NotificationsIcon className="text-gray-400 group-hover:text-white" />
              </Badge>
              <span className="ml-3 text-gray-400 group-hover:text-white font-medium" style={{ fontFamily: 'Space Grotesk' }}>
                Notifications
              </span>
            </div>
          </Tooltip>

          <Tooltip title="Bookmarks" placement="right" arrow>
            <div className="flex items-center p-3 cursor-pointer rounded-xl hover:bg-gray-800 transition-all duration-200 group">
              <BookmarkIcon className="text-gray-400 group-hover:text-white" />
              <span className="ml-3 text-gray-400 group-hover:text-white font-medium" style={{ fontFamily: 'Space Grotesk' }}>
                Bookmarks
              </span>
            </div>
          </Tooltip>

          <Tooltip title="Settings" placement="right" arrow>
            <div className="flex items-center p-3 cursor-pointer rounded-xl hover:bg-gray-800 transition-all duration-200 group">
              <SettingsIcon className="text-gray-400 group-hover:text-white" />
              <span className="ml-3 text-gray-400 group-hover:text-white font-medium" style={{ fontFamily: 'Space Grotesk' }}>
                Settings
              </span>
            </div>
          </Tooltip>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="mt-auto px-5">
        <Divider className="mb-5 bg-gray-800" />
        <div className="flex items-center justify-between p-3 cursor-pointer rounded-xl hover:bg-gray-800 transition-all duration-200">
          <div className="flex items-center">
            <Avatar
              src={auth.user?.image}
              alt={auth.user?.firstName}
              className="border-2 border-gray-700"
            />
            <div className="ml-3">
              <p className="font-medium text-white" style={{ fontFamily: 'Outfit' }}>
                {auth.user?.firstName} {auth.user?.lastName}
              </p>
              <p className="text-sm text-gray-400" style={{ fontFamily: 'Space Grotesk' }}>
                @{auth.user?.firstName?.toLowerCase()}_{auth.user?.lastName?.toLowerCase()}
              </p>
            </div>
          </div>
          
          <IconButton 
            onClick={handleOpenLogoutMenu}
            className="text-gray-400 hover:text-white"
          >
            <MoreHorizIcon />
          </IconButton>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={openLogoutMenu}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: '#1e1e1e',
              border: '1px solid #333',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              '& .MuiMenuItem-root': {
                color: '#fff',
                fontFamily: 'Space Grotesk',
                '&:hover': {
                  backgroundColor: '#333',
                },
              },
            },
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
