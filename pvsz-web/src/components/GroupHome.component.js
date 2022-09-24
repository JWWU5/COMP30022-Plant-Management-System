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
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
        width: 1,
        height: 55,
      },
    },
});


export default function GroupHome() {
    let navigate = useNavigate();

    function handleDeleteIcon() {
        navigate("/delete-groups");
    }

    function toGroupDetail() {
        navigate("/group-detail");
    }

    const [state, setState] = React.useState({
        bottom: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,  backgroundColor: '#BACB94'}}>
            <div class="createNewGroup">
                <Stack spacing={5} justify-Content="center">

                    <div className='newGroupName'>
                        <h3 className='newGroupNameTitle'>Group Name</h3>
                        <input
                            className='plantValueBlock'
                            type="text"
                        / >
                    </div>

                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" onClick={toGroupDetail} sx={{
                            height: 50,
                            borderRadius: 25,
                            color: '#646464', 
                            textTransform: 'capitalize',
                            fontFamily: 'Tamil HM', fontSize: 15, fontWeight: 'bold',
                            }}>CREATE</Button>
                    </ThemeProvider>
                </Stack>
            </div>

        </Box>
    );

    return (
        <body className='Dashboard'>
            <Header />
            <main>
                <div class="bg">
                    <div class="topic">
                        <h1>Groups</h1>
                        <div class="icons">
                            {['bottom'].map((anchor) => (
                                <React.Fragment key={anchor}>
                                <AddCircleOutlineIcon onClick={toggleDrawer(anchor, true)} sx={{color: '#ffffff', width: 30}}/>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                >
                                    {list(anchor)}
                                </SwipeableDrawer>
                                </React.Fragment>
                            ))}
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
                                        placeholder="Search the group"
                                        inputProps={{ 'aria-label': 'search the group' }}
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
                                <a>LivingRoom</a>
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