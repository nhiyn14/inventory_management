import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, Legend, CartesianGrid, XAxis, YAxis } from "recharts";
import { Bar, Tooltip } from "recharts";
import AxiosInstance from "../../AxiosInstance/Instances";
import "./Reporting.css";

function Reporting() {
    const [chartData, setChartData] = useState([]);
    const populateChart = async () => {
        try {
            const response = await AxiosInstance.get("/report1");
            const apiData = response.data.map((data) => ({
                Name: data.product_name,
                Movements: data.sold_quantity,
                Profit: data.total_profit,
            }));
            const initialChartData = []
            for (const objects in apiData) {
                let parsedData = apiData[objects];
                initialChartData.push(parsedData)
                console.log(initialChartData);
            }
            setChartData(initialChartData)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        populateChart();
    }, []);
    return (
        <div className="reportBody">
            <div className="reportChart">
                <BarChart width={730} height={250} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Movements" fill="#797ef6" />
                    <Bar dataKey="Profit" fill="#1aa7ec" />
                </BarChart>
            </div>
        </div>
    );
}

export default Reporting;
