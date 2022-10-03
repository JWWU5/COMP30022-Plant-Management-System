import React , { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Dashboard.css';

import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';

import watercan from '../assets/images/water_can.png';
import sun from '../assets/images/sun.png';
import group from '../assets/images/group.png';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function Dashboard() {
    
    let navigate = useNavigate();

    function handleAddIcon() {
        navigate("/select-plants");
    };

    return (
        <body className='Dashboard'>
            <Header />
            <main>
                <div class="welcome">
                    <h2>Welcome, Dave</h2>
                    <h3>Today is 12/09/2022.</h3>
                    <h3>Happy Birthday!</h3>
                </div>
                <div class="topic">
                    <img class="watercan"src={watercan}></img>
                    <img class="sun"src={sun}></img>
                    <img class="group"src={group}></img>
                    <AddCircleOutlineIcon onClick={handleAddIcon}/>
                </div>
                <div class="listbg">
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

                            <Accordion>
                                <AccordionSummary 
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                    <Avatar src="avatar1.jpg" sx={{ml: 2.5}}/>
                                    <a>Plant</a>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Divider />
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
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </div>
                </div>
            </main>
        </body>
    )
}