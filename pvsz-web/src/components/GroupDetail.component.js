import React , { Component } from 'react';

import Header from './Header';
import './GroupDetail.css';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function GroupDetail() {

    let navigate = useNavigate();

    function handleAddIcon() {
        navigate("/group-plants");
    };

    function handleDeleteIcon() {
        navigate("/delete-groups");
    }

    function toGroupDetail() {
        navigate("/group-detail");
    }

    return (
        <body className='Dashboard'>
            <Header />
            <main>
                <div class="groupName">
                    <h5>LivingRoom</h5>
                    <Checkbox {...label} color="error" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                    <div class="editIcon">
                    <EditIcon sx={{color: '#44533B', width: 30}} />
                    </div>
                </div>
                <div class="bg">
                    <div class="plant">
                        <Stack spacing={3} justify-Content="center">
                            <Box display='flex' justify-Content="center" sx={{
                                width: 1, 
                                height: 55,
                                backgroundColor: '#ffffff',
                                alignItems: 'center',
                                borderRadius: 25}}>
                                <Avatar src="avatar.jpg" sx={{ml: 2.5}}/>
                                <a>Group_1</a>
                                <Grid container justifyContent="flex-end">
                                    <ArrowForwardIosOutlinedIcon onClick={toGroupDetail} sx={{mr: 2.5}} />
                                </Grid>
                            </Box>
                            <Box display='flex' justify-Content="center" sx={{
                                width: 1, 
                                height: 55, 
                                backgroundColor: '#ffffff',
                                alignItems: 'center',
                                borderRadius: 25}}>
                                <Avatar src="avatar1.jpg" sx={{ml: 2.5}}/>
                                <a>Group_2</a>
                                <Grid container justifyContent="flex-end">
                                    <ArrowForwardIosOutlinedIcon onClick={toGroupDetail} sx={{mr: 2.5}} />
                                </Grid>
                            </Box>
                        </Stack>
                    </div>
                </div>
            </main>
        </body>
    )

    
    
    
}