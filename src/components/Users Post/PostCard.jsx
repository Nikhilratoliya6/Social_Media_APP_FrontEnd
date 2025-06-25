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
    <Card className="max-w-2xl w-full mx-auto mb-4 bg-white dark:bg-[#1e1e1e] shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-xl">
      <CardHeader
        className="px-4 py-3"
        avatar={
          <Avatar 
            className="bg-primary-600 hover:scale-110 transition-transform cursor-pointer"
            aria-label={item?.user?.firstName}
            src={item?.user?.avatar}
          >
            {item?.user?.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" className="text-gray-600 dark:text-gray-300">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="subtitle1" className="font-semibold text-gray-900 dark:text-gray-100">
            {item?.user?.firstName} {item?.user?.lastName}
          </Typography>
        }
        subheader={
          <Typography variant="caption" className="text-gray-500 dark:text-gray-400">
            {new Date(item?.createdAt).toLocaleDateString()}
          </Typography>
        }
      />
      
      {item?.image && (
        <div className="relative pt-[75%] w-full">
          <CardMedia
            component="img"
            className="absolute top-0 left-0 w-full h-full object-cover"
            image={item?.image}
            alt={item?.caption || "Post image"}
          />
        </div>
      )}

      <CardContent className="px-4 py-3">
        <Typography variant="body1" className="text-gray-800 dark:text-gray-200">
          {item?.caption}
        </Typography>
      </CardContent>

      <CardActions className="px-4 py-2 flex justify-between border-t border-gray-100 dark:border-gray-800">
        <div className="flex space-x-2">
          <IconButton 
            onClick={handlePostLike}
            className={`transition-all ${item?.isLiked ? 'text-red-500 scale-110' : 'text-gray-600 dark:text-gray-300'}`}
          >
            {item?.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton 
            onClick={() => setShowComment(!showComment)}
            className="text-gray-600 dark:text-gray-300 hover:text-primary-600"
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
            <ShareIcon />
          </IconButton>
        </div>
        
        <IconButton 
          onClick={handleSavePost}
          className={`transition-all ${item?.isSaved ? 'text-primary-600 scale-110' : 'text-gray-600 dark:text-gray-300'}`}
        >
          {item?.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </CardActions>

      <Collapse in={showComment} timeout="auto" unmountOnExit>
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{bgcolor:"#212534",color:"rgb(88,199,250)"}}/>
            <input
              onKeyPress={(e) => {
                console.log("e", e.target.value);
                if (e.key === "Enter") {
                  console.log("--------");
                  handleCreateComment(e.target.value);
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              type="text"
              placeholder="write your comment..."
            />
          </div>
          <Divider />
          <div className="mx-3 space-y-2 my-5 text-xs">
            {item?.comments.map((comment) => (
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-5">
                  <Avatar
                    sx={{ height: "2rem", width: "2rem", fontSize: ".8rem",bgcolor:"#212534",color:"rgb(88,199,250)" }}
                  >
                    {comment.user.firstName[0]}
                  </Avatar>
                  <p>{comment.content}</p>
                </div>
                <div>
                  <IconButton color="primary">
                    <FavoriteBorderIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Collapse>
    </Card>
  );
}
