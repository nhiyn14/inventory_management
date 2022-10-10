import RegisterUI from "./components/Registration/RegisterUI";
import LoginUI from "./components/Login/LoginUI";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

const DUMMY_DATA = [
    {
        description: "candle",
        product_id: "345",
        retail_price: "$453",
        product_status: "low",
        total_sales: "45000",
    },
    {
        description: "candle",
        product_id: "3412",
        retail_price: "$432153",
        product_status: "low",
        total_sales: "454310",
    },
    {
        description: "candle",
        product_id: "34542",
        retail_price: "$42",
        product_status: "low",
        total_sales: "4542130",
    },
    {
        description: "candle",
        product_id: "345",
        retail_price: "$453",
        product_status: "low",
        total_sales: "123546",
    },
];

function App() {
    return (
        <BrowserRouter>
            <Routes>
              <Route path = '/' element={<RegisterUI/>}></Route>
              <Route path = '/login' element={<LoginUI/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
