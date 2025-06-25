import React, { useEffect, useState } from "react";
import PostCard from "../../components/Users Post/PostCard";
import StoryCircle from "../../components/Story/StoryCircle";
import { Avatar, Card, IconButton, Tooltip } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import CreatePostModal from "../../components/CreatePost/CreatePostModal";
import AddIcon from "@mui/icons-material/Add";
import { story } from "../../components/Story/StoryData";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../Redux/Post/post.action";

const MiddlePart = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState();
  const dispatch = useDispatch();
  const { post, comment, auth } = useSelector((store) => store);

  const handleOpenCreatePostModal = () => setOpenCreatePostModal(true);
  const handleCloseCreatPostModal = () => setOpenCreatePostModal(false);

  useEffect(() => {
    dispatch(getAllPost());
  }, [comment.create, auth.token]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Stories Section */}
      <div className="bg-white dark:bg-dark-100 rounded-xl shadow-soft overflow-x-auto">
        <div className="flex p-4 space-x-4">
          <Tooltip title="Create Story">
            <div className="flex-shrink-0 flex flex-col items-center space-y-1">
              <Avatar
                sx={{
                  width: "4rem",
                  height: "4rem",
                  bgcolor: "primary.main",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                className="ring-2 ring-primary-400 cursor-pointer"
              >
                <AddIcon sx={{ fontSize: "2rem" }} />
              </Avatar>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                New
              </span>
            </div>
          </Tooltip>

          <div className="flex space-x-4 pb-2">
            {story.map((item, index) => (
              <StoryCircle
                key={index}
                image={item.image}
                username={item.username}
                userId={item.userId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Create Post Card */}
      <Card className="bg-white dark:bg-dark-100 rounded-xl shadow-soft p-4">
        <div className="flex items-center space-x-4">
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: "2.5rem",
              height: "2.5rem",
            }}
          />
          <div
            onClick={handleOpenCreatePostModal}
            className="flex-grow cursor-pointer"
          >
            <div className="px-4 py-2 bg-gray-100 dark:bg-dark-200 rounded-full hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors">
              <p className="text-gray-600 dark:text-gray-400">
                What's on your mind?
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-4 pt-4 border-t border-gray-200 dark:border-dark-300">
          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
            <ImageIcon />
            <span className="font-medium">Photo</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
            <VideocamIcon />
            <span className="font-medium">Video</span>
          </button>

          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">
            <ArticleIcon />
            <span className="font-medium">Article</span>
          </button>
        </div>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {post?.posts?.map((item) => (
          <PostCard key={item.id} item={item} />
        ))}
      </div>

      <CreatePostModal
        open={openCreatePostModal}
        handleClose={handleCloseCreatPostModal}
      />
    </div>
  );
};

export default MiddlePart;
