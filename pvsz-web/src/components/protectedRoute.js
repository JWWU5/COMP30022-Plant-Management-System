import { Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import React from "react";
const cookies = new Cookies();
export default function Protected({ Component }) {
    const token = cookies.get("TOKEN");
    console.log("unauthentification user");

    return token ? <Component /> : <Navigate to="/" />;
}
