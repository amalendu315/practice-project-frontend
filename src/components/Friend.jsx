import React from 'react';
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, Typography, IconButton, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFriends } from '../state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { useNavigate } from 'react-router-dom';

const Friend = ({
    friendId,
    name,
    subtitle,
    userPicturePath,
}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state?.user?.friends) || [];
    
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend =
      friends && friends?.find((friend) => friend._id === friendId);
      
    const patchFriend = async (friendId) => {
        const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`,{
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    };

  return (
    <FlexBetween gap="1rem" >
        <FlexBetween gap="1rem" >
            <UserImage image={userPicturePath} size="55px" />
            <Box
                onClick={() => {navigate(`/profile/${friendId}`); navigate(0)}}
            >
                <Typography variant="h5" color={main} fontWeight="500" sx={{ "&:hover":{
                    cursor: 'pointer',
                    color: palette.primary.light,
                }}}>
                    {name}                   
                </Typography>
                <Typography variant="h6" color={medium} fontSize="0.75rem">
                    {subtitle}
                </Typography>
            </Box>
        </FlexBetween>
        <IconButton
            onClick={() => patchFriend(friendId)}
            sx={{
                backgroundColor: primaryLight, p:"0.6rem"
            }}
        >
            {isFriend ? <PersonRemoveOutlined sx={{ color: primaryDark }} /> : <PersonAddOutlined sx={{ color: primaryDark }} />}
        </IconButton>
    </FlexBetween>
  )
}

export default Friend