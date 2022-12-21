import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../navbar'
import Advertwidget from '../widgets/Advertwidget'
import FriendsListWidget from '../widgets/FriendsListWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import PostWidget from '../widgets/PostWidget'
import UserWidget from '../widgets/UserWidget'

const HomePage = () => {

  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      {_id && picturePath && (
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreen ? "flex" : "block"}
          justifyContent="space-between"
          gap="0.5rem"
        >
          <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
          <Box
            flexBasis={isNonMobileScreen ? "42%" : undefined}
            mt={isNonMobileScreen ? undefined : "2rem"}
          >
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id} />
          </Box>
          {isNonMobileScreen && (
            <Box flexBasis="26%">
              <Advertwidget />
              <Box m="2rem 0" />
              <FriendsListWidget userId={_id} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default HomePage