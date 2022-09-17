import React , { Component } from 'react';
import Header from './Header';
import './PlantHome.css';

import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
                        <div>
                            <Box display='flex' justify-Content="center" sx={{
                                width: 1, 
                                height: 55,
                                backgroundColor: '#ffffff',
                                alignItems: 'center',
                                borderRadius: 25}}>
                                <Avatar src="avatar.jpg" sx={{ml: 2.5}}/>
                                <a>Plant</a>
                                <Grid container justifyContent="flex-end">
                                    <Checkbox {...label} sx={{
                                        color: '#44533B', 
                                        '&.Mui-checked': {
                                            color: '#44533B',
                                        },
                                    }}/>
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
                                    <Checkbox {...label} sx={{
                                        color: '#44533B', 
                                        '&.Mui-checked': {
                                            color: '#44533B',
                                        },
                                    }}/>
                                </Grid>
                            </Box>
                        </div>
                    </div>
                </main>
            </body>
        )
    }
}