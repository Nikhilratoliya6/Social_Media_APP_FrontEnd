import React, { useState, useEffect } from "react";
import { Avatar, Button, Divider, Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate, useLocation } from "react-router-dom";
import { navigationMenu } from "./NavigationMenu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Auth/auth.action";
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import Badge from '@mui/material/Badge';
import "./SideBar.css";

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showTooltips, setShowTooltips] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const openLogoutMenu = Boolean(anchorEl);
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Simulated notification listener
  useEffect(() => {
    const handleNewNotification = (event) => {
      if (event.detail) {
        setNotifications(prev => [...prev, event.detail]);
        showNotificationPopup(event.detail);
      }
    };

    window.addEventListener('newNotification', handleNewNotification);
    return () => window.removeEventListener('newNotification', handleNewNotification);
  }, []);

  const showNotificationPopup = (notification) => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("Niktalk", {
        body: notification.message,
        icon: "/logo192.png"
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Niktalk", {
            body: notification.message,
            icon: "/logo192.png"
          });
        }
      });
    }
  };

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
    <div className="hidden sm:flex flex-col h-screen bg-gradient-to-b from-black to-gray-900 border-r border-gray-800">
      {/* Main content container with padding for logout space */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Logo Section */}
        <div className="px-5 py-5">
          <h1 
            className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent cursor-pointer" 
            style={{ fontFamily: 'Abril Fatface' }}
            onClick={() => navigate('/')}
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
                <Badge badgeContent={notifications.length} color="primary">
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
      </div>

      {/* Logout Section - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
        <div className="flex items-center justify-between p-3 cursor-pointer rounded-xl hover:bg-gray-800 transition-all duration-200">
          <div className="flex items-center">
            <Avatar 
              src={auth.user?.image} 
              alt={auth.user?.username}
              className="ring-2 ring-primary-400 ring-offset-2 ring-offset-gray-900"
            />
            <div className="ml-3">
              <p className="font-medium text-white">
                {auth.user?.firstName} {auth.user?.lastName}
              </p>
              <p className="text-sm text-gray-400">@{auth.user?.username}</p>
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
              backgroundColor: '#1f2937',
              color: 'white',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <MenuItem onClick={handleLogout} className="hover:bg-gray-700">
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
