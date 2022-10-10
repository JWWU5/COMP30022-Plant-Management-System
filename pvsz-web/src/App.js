import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

// Import components.
import Welcome from "./components/Welcome.component";
import AboutUs from "./components/AboutUs.component";
import ContactUS from "./components/ContactUS.component";

import Login from "./components/SignIn.component";
import SignUp from "./components/SignUp.component";
import AddPlant from "./components/AddPlant.component";
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
import GroupPlantDelete from "./components/GroupPlantDelete.component";

// settings
import Setting from "./components/Setting.component";
import ChangePassword from "./components/ChangePassword.component";
import PrivatePolicy from "./components/PrivatePolicy.component";
import Protected from "./components/protectedRoute";

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
                <Route
                    path="/about-us-protected"
                    element={<Protected Component={AboutUs} />}
                />
                <Route path="/contact-us" element={<ContactUS />} />
                <Route
                    path="/contact-us-protected"
                    element={<Protected Component={ContactUS} />}
                />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />

                <Route
                    path="/dashboard"
                    element={<Protected Component={Dashboard} />}
                />
                <Route
                    path="/profile"
                    element={<Protected Component={Profile} />}
                />

                <Route
                    path="/plants"
                    element={<Protected Component={PlantHome} />}
                />
                <Route
                    path="/delete-plants"
                    element={<Protected Component={DeletePlant} />}
                />
                <Route
                    path="/select-plants"
                    element={<Protected Component={SelectPlant} />}
                />
                <Route
                    path="/add-plant"
                    element={<Protected Component={AddPlant} />}
                />
                <Route
                    path="/groups"
                    element={<Protected Component={GroupHome} />}
                />
                <Route
                    path="/delete-groups"
                    element={<Protected Component={DeleteGroup} />}
                />
                <Route
                    path="/group-plants"
                    element={<Protected Component={GroupPlant} />}
                />
                <Route
                    path="/group-detail"
                    element={<Protected Component={GroupDetail} />}
                />

                <Route
                    path="/plant-detail"
                    element={<Protected Component={PlantDetail} />}
                />
                <Route
                    path="/setting"
                    element={<Protected Component={Setting} />}
                />
                <Route
                    path="/change-password"
                    element={<Protected Component={ChangePassword} />}
                />
                <Route
                    path="/Delete-Group-Plants"
                    element={<Protected Component={GroupPlantDelete} />}
                />
                <Route path="/private-policy" element={<PrivatePolicy />} />
            </Routes>
        </Router>
    );
}

export default App;
