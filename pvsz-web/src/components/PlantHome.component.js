import React , { Component } from 'react';
import Header from './Header';
import './PlantHome.css';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function PlantHome() {
    
    let navigate = useNavigate();

    function handleAddIcon() {
        navigate("/add-plant");
    };

    function handleDeleteIcon() {
        navigate("/delete-plants");
    }

    return (
        <body className='Dashboard'>
            <Header />
            <main>
                <div class="bg">
                    <div class="topic">
                        <h1>Plants</h1>
                        <div class="icons">
                            <AddCircleOutlineIcon sx={{color: '#ffffff', width: 30}} onClick={handleAddIcon}/>
                            <RemoveCircleOutlineIcon sx={{color: '#ffffff', width: 30}} onClick={handleDeleteIcon}/>
                        </div>
                    </div>
                    <div class="plant">
                        <Stack spacing={3} justify-Content="center">
                            <div class="search">
                                <Paper
                                    component="form" sx={{ 
                                        p: '2px 4px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        width: 1, 
                                        height: 50,
                                        borderRadius: 25 }}
                                    >
                                    <b>Name</b>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search your plant"
                                        inputProps={{ 'aria-label': 'search your plant' }}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>


                                </Paper>
                            </div>
                            <Divider />
                            <Box display='flex' justify-Content="center" sx={{
                                width: 1, 
                                height: 55,
                                backgroundColor: '#ffffff',
                                alignItems: 'center',
                                borderRadius: 25}}>
                                <Avatar src="avatar.jpg" sx={{ml: 2.5}}/>
                                <a>Plant</a>
                                <a2>Livingroom</a2>
                                <Grid container justifyContent="flex-end">
                                    <ArrowForwardIosOutlinedIcon sx={{mr: 2.5}} />
                                </Grid>
                            </Box>
                            <Box display='flex' justify-Content="center" sx={{
                                width: 1, 
                                height: 55, 
                                backgroundColor: '#ffffff',
                                alignItems: 'center',
                                borderRadius: 25}}>
                                <Avatar src="avatar1.jpg" sx={{ml: 2.5}}/>
                                <a>Plant</a>
                                <Grid container justifyContent="flex-end">
                                    <ArrowForwardIosOutlinedIcon sx={{mr: 2.5}} />
                                </Grid>
                            </Box>
                        </Stack>
                    </div>
                </div>
            </main>
        </body>
    )
    
}