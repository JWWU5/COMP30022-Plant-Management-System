import React , { Component } from 'react';

import Header from './Header';
import './GroupDetail.css';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function GroupDetail() {
    const [open, setOpen] = React.useState(false);

    const deleteDoubleCheck = () => {
        setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    let navigate = useNavigate();

    function addPlants() {
        navigate("/group-plants");
    };

    function toGroupDetail() {
        navigate("/group-detail");
    }

    function Agree() {
        setOpen(false);
        navigate("/groups");
    };

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
    
            <nav aria-label="main mailbox folders">
                <List>
                <ListItem >
                    <ListItemButton onClick={addPlants}>
                        <AddCircleOutlineIcon sx={{ml:2, color:'#ffffff'}}/>
                        <ListItemText primary="Add plants" sx={{ml:5, color:'#ffffff'}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem >
                    <ListItemButton>
                        <RemoveCircleOutlineIcon sx={{ml:2, color:'#ffffff'}}/>
                        <ListItemText primary="Delete plants" sx={{ml:5, color:'#ffffff'}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem >
                    <ListItemButton onClick={deleteDoubleCheck}>
                        <DeleteOutlineIcon sx={{ml:2, color:'#ffffff'}}/>
                        <ListItemText primary="Delete this group" sx={{ml:5, color:'#ffffff'}}/>
                        
                    </ListItemButton>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                    >
                        <DialogTitle sx={{fontWeight: 'bold', fontSize: 20}}>{"Are you sure to delete this plant?"}</DialogTitle>
                        <DialogActions>
                        <Button color="success" onClick={handleClose}>No</Button>
                        <Button color="error" onClick={Agree}>yes!</Button>
                        </DialogActions>
                    </Dialog>
            </ListItem>

                </List>
            </nav>
        </Box>
    );

    return (
        <body className='Dashboard'>
            <Header />
            <main>
                <div class="groupName">
                    <h5>LivingRoom</h5>
                    <Checkbox {...label} color="error" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                    <div class="editIcon">
                        {['bottom'].map((anchor) => (
                            <React.Fragment key={anchor}>
                            <EditIcon onClick={toggleDrawer(anchor, true)} sx={{color: '#44533B', width: 30}}/>
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
                    </div>
                </div>
                <div class="bg">
                    <div class="plantInGroup">
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