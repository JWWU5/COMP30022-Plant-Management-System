import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./sidebar.scss";

const sidebarNavItems = [
    {
        display: "< RETURN",

        to: "/",
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
        section: "started",
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
        to: "/about-us",
        section: "about",
    },
    {
        display: "CONTACT US",
        icon: <i className="bx bx-phone-call"></i>,
        to: "/contact-us",
        section: "contact",
    },
    {
        display: "SETTING",
        icon: <i className="bx bx-edit-alt"></i>,
        to: "/setting",
        section: "setting",
    },
];

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

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
        <div className="sidebar">
            <div ref={sidebarRef} className="sidebar__menu">
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
    );
};

export default Sidebar;
