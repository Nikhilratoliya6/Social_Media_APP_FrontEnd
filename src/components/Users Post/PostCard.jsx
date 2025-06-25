import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { pink, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch } from "react-redux";
import { createComment, likeComment } from "../../Redux/Comment/comment.action";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Divider } from "@mui/material";
import { likePost, savePost } from "../../Redux/Post/post.action";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function PostCard({ item }) {
  const [showComment, setShowComment] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const dispatch = useDispatch();

  const handleCreateComment = (content) => {
    dispatch(createComment({ postId: item?.id, data: { content } }));
  };

  const handlePostLike = () => {
    dispatch(likePost(item?.id));
  };

  const handleSavePost = () => {
    dispatch(savePost(item?.id));
  };

  return (
    <Card 
      className="max-w-2xl w-full mx-auto mb-6 bg-white dark:bg-[#1e1e1e] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader
        className="px-5 py-4"
        avatar={
          <Avatar 
            className="transform transition-transform duration-300 hover:scale-110 cursor-pointer bg-gradient-to-r from-primary-500 to-secondary-500"
            aria-label={item?.user?.firstName}
            src={item?.user?.image}
            sx={{ width: 45, height: 45 }}
          >
            {item?.user?.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography 
            variant="subtitle1" 
            className="font-display font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400 cursor-pointer"
          >
            {item?.user?.firstName} {item?.user?.lastName}
          </Typography>
        }
        subheader={
          <Typography 
            variant="caption" 
            className="font-body text-gray-500 dark:text-gray-400"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            {new Date(item?.createdAt).toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Typography>
        }
      />
      
      {item?.image && (
        <div 
          className="relative pt-[75%] w-full overflow-hidden"
          onDoubleClick={handlePostLike}
        >
          <CardMedia
            component="img"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
            image={item?.image}
            alt={item?.caption || "Post image"}
          />
        </div>
      )}

      <CardContent className="px-5 py-4">
        <Typography 
          variant="body1" 
          className="text-gray-800 dark:text-gray-200 font-body"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          {item?.caption}
        </Typography>
      </CardContent>

      <CardActions className="px-5 py-3 flex justify-between border-t border-gray-100 dark:border-gray-800">
        <div className="flex space-x-3">
          <IconButton 
            onClick={handlePostLike}
            className={`transition-all duration-300 ${
              item?.isLiked 
                ? 'text-red-500 hover:text-red-600 transform hover:scale-110' 
                : 'text-gray-600 dark:text-gray-300 hover:text-red-500'
            }`}
          >
            {item?.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton 
            onClick={() => setShowComment(!showComment)}
            className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-300"
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-300">
            <ShareIcon />
          </IconButton>
        </div>
        
        <IconButton 
          onClick={handleSavePost}
          className={`transition-all duration-300 ${
            item?.isSaved 
              ? 'text-primary-500 transform scale-110' 
              : 'text-gray-600 dark:text-gray-300 hover:text-primary-500'
          }`}
        >
          {item?.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </CardActions>

      <Collapse in={showComment} timeout="auto" unmountOnExit>
        <section className="px-5 py-3 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar sx={{bgcolor:"#212534",color:"rgb(88,199,250)"}}/>
            <input
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  handleCreateComment(e.target.value);
                  e.target.value = '';
                }
              }}
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-800 dark:text-gray-200 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 transition-colors duration-200"
              type="text"
              placeholder="Write a comment..."
            />
          </div>

          <div className="space-y-3">
            {item?.comments.map((comment) => (
              <div key={comment.id} className="flex justify-between items-start group">
                <div className="flex items-start space-x-3">
                  <Avatar
                    sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500"
                  >
                    {comment.user.firstName[0]}
                  </Avatar>
                  <div>
                    <Typography variant="subtitle2" className="font-semibold text-gray-900 dark:text-gray-100">
                      {comment.user.firstName} {comment.user.lastName}
                    </Typography>
                    <Typography variant="body2" className="text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </Typography>
                  </div>
                </div>
                <IconButton 
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500"
                  size="small"
                >
                  <FavoriteBorderIcon sx={{ fontSize: "1rem" }} />
                </IconButton>
              </div>
            ))}
          </div>
        </section>
      </Collapse>
    </Card>
  );
}
