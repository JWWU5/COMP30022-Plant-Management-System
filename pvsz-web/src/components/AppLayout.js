import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div
            style={{
                padding: "50px 0px 0px 370px",
            }}
        >
            <Outlet />
        </div>
    );
};

export default AppLayout;
