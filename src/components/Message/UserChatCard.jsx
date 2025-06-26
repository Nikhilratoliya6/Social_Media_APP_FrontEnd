import { Avatar, CardHeader, IconButton } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const UserChatCard = ({ chat }) => {
  const { auth } = useSelector((store) => store);

  if (!chat) {
    return null;
  }

  // Get the other user from the chat members
  const otherUser = chat.users?.find(user => user.id !== auth.user?.id);
  const lastMessage = chat.messages && chat.messages.length > 0 
    ? chat.messages[chat.messages.length - 1]?.content 
    : '';

  return (
    <div className={`hover:bg-gray-800 cursor-pointer transition-colors duration-200 ${chat.isSelected ? 'bg-gray-800' : ''}`}>
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
            src={otherUser?.image || undefined}
            alt={otherUser?.firstName || 'User'}
          >
            {!otherUser?.image && ((otherUser?.firstName?.[0] || '?').toUpperCase())}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title={`${otherUser?.firstName || 'Unknown'} ${otherUser?.lastName || ''}`}
        subheader={
          <span className="text-gray-400">
            {lastMessage || 'No messages yet'}
          </span>
        }
      />
    </div>
  );
};

UserChatCard.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.number,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        image: PropTypes.string
      })
    ),
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string
      })
    )
  })
};

export default UserChatCard;
