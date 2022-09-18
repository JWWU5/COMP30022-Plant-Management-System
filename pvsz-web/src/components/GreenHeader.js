import "./Header.css";
import whiteMenubar from "../assets/images/menu_white_icon.png";
import greenMenubar from "../assets/images/menu_green_icon.png";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./sidebar.scss";

const sidebarNavItems = [
    {
        display: "< RETURN",

        to: window.location.pathname.split("/")[0],
        section: "",
    },
    {
        display: "HOME",
        icon: <i className="bx bx-home"></i>,
        to: "/",
        section: "",
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
        to: "/group",
        section: "group",
    },
    {
        display: "RANKINGT",
        icon: <i className="bx bx-line-chart"></i>,
        to: "/ranking",
        section: "ranking",
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
        to: "/about",
        section: "about",
    },
    {
        display: "CONTACT US",
        icon: <i className="bx bx-phone-call"></i>,
        to: "/contact",
        section: "contact",
    },
    {
        display: "SETTING",
        icon: <i className="bx bx-edit-alt"></i>,
        to: "/setting",
        section: "setting",
    },
];

const Header = (menubarColour) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector(
                ".sidebar__menu__item"
            );
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split("/")[1];
        const activeItem = sidebarNavItems.findIndex(
            (item) => item.section === curPath
        );
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <>
            <nav className="navbar_style">
                <button onClick={showSidebar}>
                    <img src={greenMenubar} className="menuIcon"></img>
                </button>
            </nav>
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
};

export default Header;
