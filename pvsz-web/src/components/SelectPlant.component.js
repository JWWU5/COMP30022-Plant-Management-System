import React , { Component } from 'react';
import Header from './Header';
import './delete.css';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import zombie_hand from '../assets/images/halloween.svg';
import Button from '@mui/material/Button';
import axios from "axios";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };





const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
        width: 1,
        height: 55,
      },
    },
  });


export default class Dashboard extends Component {
    render() {
        return (
            <body className='Dashboard'>
                <Header />
                <main>
                    <div class="bg">
                        <div class="topic">
                            <h2>Select</h2>
                            <img class="hand"src={zombie_hand}></img>
                        </div>
                        <h4>Your Plant</h4>
                        
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
                                            placeholder="Search the plant"
                                            inputProps={{ 'aria-label': 'search your plant' }}
                                        />
                                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                    </Paper>
                                </div>
                                <ThemeProvider theme={theme}>
                                    <Button variant="contained" color="primary" sx={{
                                        height: 50,
                                        borderRadius: 25,
                                        color: '#646464', 
                                        textTransform: 'capitalize',
                                        fontFamily: 'Tamil HM', fontSize: 15}}>Customise new plant</Button>
                                </ThemeProvider>
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