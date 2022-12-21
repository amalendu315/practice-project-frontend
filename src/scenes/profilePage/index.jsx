import React,{useState} from 'react'
import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../navbar'
import FriendsListWidget from '../widgets/FriendsListWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import PostsWidget from '../widgets/PostsWidget'
import UserWidget from '../widgets/UserWidget'

const ProfilePage = () => {

  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setUser(data);
  };

  React.useEffect(() => {
    fetchUser();
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return <div>Loading...</div>;
  } else {
    return (
      <Box>
        <Navbar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreen ? "flex" : "block"}
          justifyContent="center"
          gap="2rem"
        >
          <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
            <UserWidget
              userId={userId}
              picturePath={
                user?.picturePath || undefined
              }
            />
            <Box m="2rem 0" />
            <FriendsListWidget userId={userId} />
          </Box>
          <Box
            flexBasis={isNonMobileScreen ? "42%" : undefined}
            mt={isNonMobileScreen ? undefined : "2rem"}
          >
            <MyPostWidget
              picturePath={
                user?.picturePath || undefined
              }
            />
            <Box m="2rem 0" />
            <PostsWidget userId={userId} isProfile={true} />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ProfilePage