import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import components.
import Welcome from "./components/Welcome.component";
import AboutUs from "./components/AboutUs.component";
import ContactUS from "./components/ContactUS.component";
import SignIn from "./components/SignIn.component";
import SignUp from "./components/SignUp.component";
import AppLayout from "./components/AppLayout";
import AddPlant from "./components/AddPlant.component";
// import DynamicButton from "./components/dynamicButton";
import Profile from "./components/Profile.component";
import "boxicons/css/boxicons.min.css";
import "./App.css";
// After login
import Dashboard from "./components/Dashboard.component";
// plants
import PlantHome from "./components/PlantHome.component";
import DeletePlant from "./components/DeletePlant.component";
import SelectPlant from "./components/SelectPlant.component";
import PlantDetail from "./components/PlantDetail.component";
// groups
import GroupHome from "./components/GroupHome.component";
import DeleteGroup from "./components/DeleteGroup.component";
import GroupPlant from "./components/GroupPlants.component";
import GroupDetail from "./components/GroupDetail.component";

// ranking
import Ranking from "./components/Ranking.component";
// settings
import Setting from "./components/Setting.component";
import ChangePassword from "./components/ChangePassword.component";
import PrivatePolicy from "./components/PrivatePolicy.component";

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
                <Route path="/contact-us" element={<ContactUS />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/plants" element={<PlantHome />} />
                <Route path="/delete-plants" element={<DeletePlant />} />
                <Route path="/select-plants" element={<SelectPlant />} />
                <Route path="/add-plant" element={<AddPlant />}/>
                <Route path="/groups" element={<GroupHome />} />
                <Route path="/delete-groups" element={<DeleteGroup />} />
                <Route path="/group-plants" element={<GroupPlant />} />
                <Route path="/group-detail" element={<GroupDetail />} />

                <Route path="/plant-detail" element={<PlantDetail />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/private-policy" element={<PrivatePolicy />} />
            </Routes>
        </Router>
    );
}

export default App;
