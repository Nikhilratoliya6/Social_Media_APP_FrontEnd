import { Avatar, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const UserChatCard = ({ item }) => {
  const { auth } = useSelector((store) => store);

  if (!item) {
    return null; // Or return a fallback UI component
  }

  const lastMessage = item.messages && item.messages.length > 0 
    ? item.messages[item.messages.length - 1]?.content 
    : '';

  return (
    <CardHeader
      avatar={
        <Avatar
          sx={{
            width: "3.5rem",
            height: "3.5rem",
            fontSize: "1.5rem",
            bgcolor: "#191c29",
            color: "rgb(88,199,250)"
          }}
          aria-label="user avatar"
          src={item.image || undefined}
          alt={item.chat_name || 'User'}
        >
          {!item.image && (item.chat_name?.[0]?.toUpperCase() || '?')}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreHorizIcon />
        </IconButton>
      }
      title={item.chat_name || 'Unknown User'}
      subheader={lastMessage || 'No messages yet'}
    />
  );
};

UserChatCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    chat_name: PropTypes.string,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string
      })
    )
  })
};

export default UserChatCard;
