import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Badge, IconButton, Menu, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileNavBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const { auth } = useSelector(state => state);
  const [notifications] = useState([
    { id: 1, text: 'John liked your post', time: '2m ago' },
    { id: 2, text: 'New comment on your photo', time: '5m ago' },
    { id: 3, text: 'Sarah started following you', time: '10m ago' },
  ]);

  const handleNotificationClick = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className="fixed bottom-0 w-full border-t border-gray-800 bg-black z-50 md:hidden"
        sx={{
          height: '60px',
          '& .MuiBottomNavigationAction-root': {
            color: '#8E8E8E',
            '&.Mui-selected': {
              color: '#FF3040',
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={() => navigate('/')}
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          onClick={() => navigate('/search')}
        />
        <BottomNavigationAction
          label="Create"
          icon={<AddBoxOutlinedIcon />}
          onClick={() => navigate('/create')}
        />
        <BottomNavigationAction
          label="Notifications"
          icon={
            <Badge badgeContent={3} color="primary">
              <NotificationsIcon onClick={handleNotificationClick} />
            </Badge>
          }
        />
        <BottomNavigationAction
          label="Profile"
          icon={<PersonOutlineIcon />}
          onClick={() => navigate(`/profile/${auth.user?.id}`)}
        />
      </BottomNavigation>

      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        PaperProps={{
          sx: {
            mt: -5,
            ml: -2,
            background: '#121212',
            color: '#fff',
            '& .MuiMenuItem-root': {
              padding: 2,
              borderBottom: '1px solid rgba(255,255,255,0.1)',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {notifications.map((notification) => (
          <MenuItem 
            key={notification.id}
            onClick={handleNotificationClose}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 0.5,
            }}
          >
            <span className="text-sm">{notification.text}</span>
            <span className="text-xs text-gray-400">{notification.time}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MobileNavBar;