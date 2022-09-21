import React , { Component } from 'react';
import Header from './Header';
import './delete.css';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import tomb from '../assets/images/tomb.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function DeleteGroup() {
    const [open, setOpen] = React.useState(false);

    const deleteDoubleCheck = () => {
        setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    let navigate = useNavigate();

    function Agree() {
        setOpen(false);
        navigate("/groups");
    };

    return (
        <body className='Dashboard'>
            <Header />
            <main>
                <div class="bg">
                    <div class="topic">
                        <h2>Delete?</h2>
                        <img class="tomb"src={tomb}></img>
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
                                        height: 55,
                                        borderRadius: 25 }}
                                    >
                                    <b>Name</b>
                                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search your group"
                                        inputProps={{ 'aria-label': 'search your plant' }}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>
                            </div>
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" color="primary" onClick={deleteDoubleCheck} sx={{
                                    borderRadius: 25,
                                    color: '#646464', 
                                    fontFamily: 'Tamil HM', fontSize: 20}}>DELETE</Button>
                                    <Dialog
                                        open={open}
                                        TransitionComponent={Transition}
                                        keepMounted
                                        onClose={handleClose}
                                    >
                                        <DialogTitle>{"Are you sure to delete this plant?"}</DialogTitle>
                                        <DialogActions>
                                        <Button onClick={handleClose}>Disagree</Button>
                                        <Button onClick={Agree}>Agree</Button>
                                        </DialogActions>
                                    </Dialog>
                            </ThemeProvider>
                            <Divider />
                            <Box display='flex' justify-Content="center" sx={{
                                width: 1, 
                                height: 55,
                                backgroundColor: '#ffffff',
                                alignItems: 'center',
                                borderRadius: 25}}>
                                <Avatar src="avatar.jpg" sx={{ml: 2.5}}/>
                                <a>Group_1</a>
                                <Grid container justifyContent="flex-end">
                                    <Checkbox {...label} sx={{
                                        color: '#44533B', 
                                        mr: 1,
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
                                <a>Group_2</a>
                                <Grid container justifyContent="flex-end">
                                    <Checkbox {...label} sx={{
                                        color: '#44533B', 
                                        mr: 1,
                                        '&.Mui-checked': {
                                            color: '#44533B',
                                        },
                                    }}/>
                                </Grid>
                            </Box>
                        </Stack>
                    </div>
                </div>
            </main>
        </body>
    )
}
