import RegisterUI from "./components/Registration/RegisterUI";
import LoginUI from "./components/Login/LoginUI";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import DashboardMenu from "./components/Dashboard/DashboardMenu";
import Reporting from "./components/Reporting/Reporting";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/registration" element={<RegisterUI />}></Route>
                <Route path="/" element={<LoginUI />}></Route>
                <Route path="/dashboard" element={<DashboardMenu/>}></Route>
                <Route path="/reports" element={<Reporting/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
