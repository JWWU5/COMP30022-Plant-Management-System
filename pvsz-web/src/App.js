import axios from "axios";
function App() {
    const getDataHandler = () => {
        axios.get("http://localhost:5000/api/v1/user").then((res) => {
            console.log(res, "require data");
        });
    };
    return (
        <div className="App">
            <button onClick={getDataHandler}>click button to get data</button>
        </div>
    );
}

export default App;
