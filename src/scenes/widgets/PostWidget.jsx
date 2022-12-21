import React, { useState } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, IconButton, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setPosts } from "../../state";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLoading = useSelector((state) => state.loading); 
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
    const primary = palette.primary.main;

  const patchLike = async () => {
    dispatch(setLoading({ loading: true }))
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPosts({posts:updatedPost}));
    dispatch(setLoading({ loading: false }))
    navigate(0)
  };

  return (
    <>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <WidgetWrapper m="2rem 0">
          {!isLoading ? (
            <>
              <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
              />
            </>
          ) : (
            <Typography>Loading....</Typography>
          )}
          <Typography color={main} sx={{ mt: "1rem" }}>
            {description}
          </Typography>
          {!isLoading && picturePath && (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          )}
          <FlexBetween sx={{ mt: "0.25rem" }}>
            <FlexBetween gap="1rem">
              <FlexBetween gap="0.3rem">
                <IconButton onClick={patchLike} disabled={isLoading}>
                  {isLiked ? (
                    <FavoriteOutlined sx={{ color: primary }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>
                <Typography>{likeCount}</Typography>
              </FlexBetween>
              <FlexBetween gap="0.3rem">
                <IconButton
                  onClick={() => {
                    setIsComments(!isComments);
                    console.log(isComments);
                  }}
                >
                  <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{comments.length}</Typography>
              </FlexBetween>
            </FlexBetween>
            <IconButton>
              <ShareOutlined />
            </IconButton>
          </FlexBetween>
          {/* { isComments && (
        <Box mt="0.5rem" >
          { comments?.map((comment,i) => {
            <Box
                key={`${name}-${i}`}
            >
                <Divider />
                <Typography sx={{
                    color:main,
                    m:"0.5rem 0",
                    pl:"1rem"
                }} >
                    {comment}
                </Typography>
            </Box>
          }) }  
          <Divider />
        </Box>
    ) } */}
          {isComments && (
            <Box mt="0.5rem">
              {comments?.map((c, i) => {
                return (
                  <Box key={`${name}-${i}`}>
                    <Divider />
                    <Typography
                      sx={{
                        color: main,
                        m: "0.5rem 0",
                        pl: "1rem",
                      }}
                    >
                      {c}
                    </Typography>
                  </Box>
                );
              })}
              <Divider />
            </Box>
          )}
        </WidgetWrapper>
      )}
    </>
  );
};

export default PostWidget;
