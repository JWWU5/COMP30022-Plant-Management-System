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


export default class Dashboard extends Component {
    render() {
        return (
            <body className='Dashboard'>
                <Header />
                <main>
                    <div class="bg">
                        <div class="topic">
                            <h2>Plants</h2>
                            <div class="icons">
                                <AddCircleOutlineIcon sx={{color: '#ffffff'}}/>
                                <RemoveCircleOutlineIcon sx={{color: '#ffffff'}}/>
                            </div>
                        </div>
                        <div class="list">
                            <Stack spacing={3} justify-Content="center">
                                <Box display='flex' justify-Content="center" sx={{
                                    width: 1, 
                                    height: 55,
                                    backgroundColor: '#ffffff',
                                    alignItems: 'center',
                                    borderRadius: 25}}>
                                    <Avatar src="avatar.jpg" sx={{ml: 2.5}}/>
                                    <a>Plant</a>
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
}