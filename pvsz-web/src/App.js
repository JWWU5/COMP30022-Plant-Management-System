import axios from "axios";
// import Register from "./components/Register";
// import AboutUs from "./components/AboutUs";
import ContactUS from "./components/ContactUS";

function App() {
    const getDataHandler = () => {
        axios.get("http://localhost:5000/api/v1/user").then((res) => {
            console.log(res, "require data");
        });
    };
    return (
        // <Register />
        // <AboutUs />
        <ContactUS />
    );
}

export default App;
