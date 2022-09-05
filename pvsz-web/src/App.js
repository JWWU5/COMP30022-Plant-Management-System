import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Import components. 
import Welcome from "./components/Welcome.component";
import Register from "./components/Register";
import AboutUs from './components/AboutUs.component';
// import ContactUS from "./components/ContactUS";

function App() {
    const getDataHandler = () => {
        axios.get("http://localhost:5000/api/v1/user").then((res) => {
            console.log(res, "require data");
        });
    };
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Welcome />} />
                <Route path="/about-us" element={<AboutUs />} />
            </Routes>
            {/* <Register />
            <AboutUs />
            <ContactUS /> */}
        </Router>
        
    );
}

export default App;
