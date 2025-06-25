import React, { useState } from "react";
import { Avatar, Button, Divider, Menu, MenuItem, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { navigationMenu } from "./NavigationMenu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Auth/auth.action";
import "./SideBar.css";

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openLogoutMenu = Boolean(anchorEl);
  const { auth } = useSelector((store) => store);

  const navigate = useNavigate();
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={`card text-white transition-all duration-300 bg-[rgb(3,11,40)] ${mobileMenuOpen ? 'h-auto' : 'h-screen'} flex flex-col justify-between py-5 lg:w-[280px] md:w-[100px] w-full fixed lg:relative z-50 ${mobileMenuOpen ? '' : 'md:h-screen'}`}>
      <div className="space-y-8 pl-5">
        <div className="flex items-center justify-between pr-5">
          <span className="logo text-2xl font-bold md:hidden lg:block">Niktalk</span>
          <IconButton 
            color="inherit" 
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
        </div>
        
        <div className={`space-y-8 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
          {navigationMenu.map((item) => (
            <div
              key={item.title}
              onClick={() => {
                item.title === "Profile"
                  ? navigate(`/profile/${auth.user.id}`)
                  : navigate(`${item.path}`);
                setMobileMenuOpen(false);
              }}
              className="cursor-pointer flex space-x-3 items-center hover:bg-[rgba(255,255,255,0.1)] p-2 rounded-lg transition-all"
            >
              <div className="text-2xl">{item.icon}</div>
              <p className="text-xl md:hidden lg:block">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Divider />
        <div className="pl-5 flex items-center  justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar
              alt="Remy Sharp"
              src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
            />

            <div>
              <p className="font-bold">{auth.user?.firstName +" "+ auth.user?.lastName}</p>
              <p className="opacity-70">{auth.user?.firstName}</p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={openLogoutMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openLogoutMenu ? "true" : undefined}
            onClick={handleOpenLogoutMenu}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openLogoutMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
