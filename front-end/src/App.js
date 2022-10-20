import RegisterUI from "./components/Registration/RegisterUI";
import LoginUI from "./components/Login/LoginUI";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Header from "./components/Dashboard/Header";
import DashboardMenu from "./components/Dashboard/DashboardMenu";
import DashboardForm from "./components/Dashboard/DashboardForm"
import DataDash from "./components/Dashboard/DataDash";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/registration" element={<RegisterUI />}></Route>
                <Route path="/" element={<LoginUI />}></Route>
                <Route path="/dashboard" element={<DashboardMenu/>}></Route>
                <Route path="/dashdata" element={<DataDash/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
