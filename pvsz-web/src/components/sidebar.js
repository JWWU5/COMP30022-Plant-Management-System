import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./sidebar.scss";

const sidebarNavItems = [
    {
        display: "HOME",
        icon: <i className="bx bx-home"></i>,
        to: "/",
        section: "",
    },
    {
        display: "PLANTS",
        icon: <i className="bx bx-leaf"></i>,
        to: "/started",
        section: "started",
    },
    {
        display: "GROUPS",
        icon: <i className="bx bx-group"></i>,
        to: "/calendar",
        section: "calendar",
    },
    {
        display: "RANKINGT",
        icon: <i className="bx bx-line-chart"></i>,
        to: "/user",
        section: "user",
    },
    {
        display: "PROFILE",
        icon: <i className="bx bx-user"></i>,
        to: "/order",
        section: "order",
    },
    {
        display: "ABOUT US",
        icon: <i className="bx bx-book"></i>,
        to: "/order",
        section: "order",
    },
    {
        display: "CONTACT US",
        icon: <i className="bx bx-phone-call"></i>,
        to: "/order",
        section: "order",
    },
    {
        display: "SETTING",
        icon: <i className="bx bx-edit-alt"></i>,
        to: "/order",
        section: "order",
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
            <div className="sidebar__logo">RETUTN</div>
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
