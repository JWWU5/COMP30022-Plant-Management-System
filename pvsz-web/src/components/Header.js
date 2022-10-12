import "./Header.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import "./sidebar.scss";
import backgroundMusic from '../assets/audio/bgM.mp3'


const sidebarNavItems = [
    {
        display: "< RETURN",

        to: window.location.pathname.split("/")[0],
        section: "",
    },
    {
        display: "HOME",
        icon: <i className="bx bx-home"></i>,
        to: "/dashboard",
        section: "dashboard",
    },
    {
        display: "PLANTS",
        icon: <i className="bx bx-leaf"></i>,
        to: "/plants",
        section: "plants",
    },
    {
        display: "GROUPS",
        icon: <i className="bx bx-group"></i>,
        to: "/groups",
        section: "groups",
    },
    {
        display: "PROFILE",
        icon: <i className="bx bx-user"></i>,
        to: "/profile",
        section: "profile",
    },
    {
        display: "ABOUT US",
        icon: <i className="bx bx-book"></i>,
        to: "/about-us-protected",
        section: "about-us-protected",
    },
    {
        display: "CONTACT US",
        icon: <i className="bx bx-phone-call"></i>,
        to: "/contact-us-protected",
        section: "contact-us-protected",
    },
    {
        display: "SETTING",
        icon: <i className="bx bx-edit-alt"></i>,
        to: "/setting",
        section: "setting",
    },
];
const sidebarNavItems2 = [
    {
        display: "< RETURN",

        to: window.location.pathname.split("/")[0],
        section: "",
    },
    {
        display: "HOME",
        icon: <i className="bx bx-home"></i>,
        to: "/",
        section: "/",
    },
    {
        display: "ABOUT US",
        icon: <i className="bx bx-book"></i>,
        to: "/about-us",
        section: "/about-us",
    },
    {
        display: "CONTACT US",
        icon: <i className="bx bx-phone-call"></i>,
        to: "/contact-us",
        section: "contact-us",
    },
    {
        display: "SIGN-IN",
        icon: <i className="bx bx-user-check"></i>,
        to: "/sign-in",
        section: "setting",
    },
    {
        display: "SIGN-UP",
        icon: <i className="bx bx-edit-alt"></i>,
        to: "/sign-up",
        section: "setting",
    },
];

const Header = (menubarColour) => {
    const [enableOverlay] = useState(true);

    const [activeIndex] = useState(0);
    const sidebarRef = useRef();
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const toggleLeft = () => {
        setSidebar((prev) => !prev);
    };

    if (
        window.location.pathname.split("/")[1] === "sign-in" ||
        window.location.pathname.split("/")[1] === "sign-up" ||
        window.location.pathname.split("/")[1] === "contact-us" ||
        window.location.pathname.split("/")[1] === "about-us"
    ) {
        return (
            <>
                <embed src={backgroundMusic} loop="true" autostart="true" hidden="true" width={0} height={0}/>
                <nav className="navbar_style">
                    <button onClick={showSidebar}>
                        <MenuIcon sx={{ color: "#ffffff", width: 1 }} />
                    </button>
                </nav>
                <Drawer
                    open={sidebar}
                    onClose={toggleLeft}
                    direction="left"
                    style={{
                        width: "66%",
                        backgroundColor: "transparent",
                    }}
                    enableOverlay={enableOverlay}
                ></Drawer>
                <div className={sidebar ? "sidebar" : "nav-menu"}>
                    <div
                        ref={sidebarRef}
                        className="sidebar__menu"
                        onClick={showSidebar}
                    >
                        {sidebarNavItems2.map((item, index) => (
                            <Link to={item.to} key={index}>
                                <div
                                    className={`sidebar__menu__item ${
                                        activeIndex === index ? "active" : ""
                                    }`}
                                >
                                    <div className="sidebar__menu__item__icon">
                                        {item.icon}
                                    </div>
                                    <div className="sidebar__menu__item__text">
                                        {item.display}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <embed src={backgroundMusic} loop="true" autostart="true" hidden="true" width={0} height={0}/>
                <nav className="navbar_style">
                    <button onClick={showSidebar}>
                        <MenuIcon sx={{ color: "#44533B", width: 1 }} />
                    </button>
                </nav>
                <Drawer
                    open={sidebar}
                    onClose={toggleLeft}
                    direction="left"
                    style={{
                        width: "66%",
                        backgroundColor: "transparent",
                    }}
                    enableOverlay={enableOverlay}
                ></Drawer>
                <div className={sidebar ? "sidebar" : "nav-menu"}>
                    <div
                        ref={sidebarRef}
                        className="sidebar__menu"
                        onClick={showSidebar}
                    >
                        {sidebarNavItems.map((item, index) => (
                            <Link to={item.to} key={index}>
                                <div
                                    className={`sidebar__menu__item ${
                                        activeIndex === index ? "active" : ""
                                    }`}
                                >
                                    <div className="sidebar__menu__item__icon">
                                        {item.icon}
                                    </div>
                                    <div className="sidebar__menu__item__text">
                                        {item.display}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        );
    }
};

export default Header;
