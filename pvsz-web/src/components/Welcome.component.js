import React from 'react';
import './Welcome.css';
import './dynamicButton.scss';
import logo from "../assets/images/logo.jpg";
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import background from "../assets/images/background.png";
import { convertLength } from '@mui/material/styles/cssUtils';

var backgroundStyle = {
    width: "100%",
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover'
};

const theme = createTheme({
    palette: {
        green: {
            main: "#768457",
            width: 1,
            height: 55,
        },
    },
});

export default function Welcome() {

    let navigate = useNavigate();

    function handleSignIN() {
        navigate("/sign-in");
    }

    function handleSignUP() {
        navigate("/sign-up");
    }

    function handleAboutUS() {
        navigate("about-us");
    }

    return (
        <main className='welcome' style={backgroundStyle}>
            <p className='welcomeText'>Welcome to</p> 
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            >
                <div>
                    <img src={logo} className='logoStyle'></img>
                </div>

                <div class="signInButtons">
                    <ThemeProvider theme={theme}>
                        <Stack spacing={3} justify-Content="center">
                            <Button
                                variant="contained"
                                color="green"
                                onClick={handleSignIN}
                                sx={{
                                    height: 50,
                                    borderRadius: 25,
                                    color: "#ffffff",
                                    textTransform: "capitalize",
                                    fontFamily: "Times New Roman",
                                    fontSize: 15,
                                    fontWeight: "bold",
                                }}
                            >
                                SIGN IN
                            </Button>
                            <Button
                                variant="contained"
                                color="green"
                                onClick={handleSignUP}
                                sx={{
                                    height: 50,
                                    borderRadius: 25,
                                    color: "#ffffff",
                                    textTransform: "capitalize",
                                    fontFamily: "Times New Roman",
                                    fontSize: 15,
                                    fontWeight: "bold",
                                }}
                            >
                                SIGN UP
                            </Button>
                        </Stack>
                    </ThemeProvider>
                </div>
                <div>
                    <ul>
                        <li className='aboutText' onClick={handleAboutUS}>Click here to learn more about our website.</li> 
                    </ul>
                </div>
            </Grid>
        </main>
    )
}