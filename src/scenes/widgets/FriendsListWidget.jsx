import React,{ useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setFriends } from '../../state'
import Friend from '../../components/Friend'


const FriendsListWidget = ({ userId }) => {

     const dispatch = useDispatch();
     const { palette } = useTheme();
     const token = useSelector((state) => state.token);
     const friends = useSelector((state) => state?.user?.friends) || [];

     const getFriends = async () => {
        setLoading({ loading: true });
        const response = await fetch(`http://localhost:3001/users/${userId}/friends`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const friends = await response.json();
        dispatch(setFriends({friends:friends}));
        setLoading({ loading: false });
     };

     useEffect(() => {
        getFriends();
     },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
        <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ marginBottom: "1.5rem" }}
        >
            Friends List
        </Typography>
        <Box display={"flex"} flexDirection="column" gap="1.5rem" >
            {friends?.map((friend) => (
                <Friend 
                    key={friend._id}
                    friendId={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    subtitle={friend.occupation}
                    userPicturePath={friend.picturePath}
                />
            ))}
        </Box>
    </WidgetWrapper>
  )
}

export default FriendsListWidget