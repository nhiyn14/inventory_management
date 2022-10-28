import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, Legend, CartesianGrid, XAxis, YAxis } from "recharts";
import { Bar, Tooltip } from "recharts";
import { LineChart, Line } from "recharts";
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
                Revenue: data.total_revenue,
            }));
            const initialChartData = [];
            for (const objects in apiData) {
                let parsedData = apiData[objects];
                initialChartData.push(parsedData);
                console.log(initialChartData);
            }
            setChartData(initialChartData);
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
                    <Bar dataKey="Revenue" fill="#1e2f97" />
                </BarChart>
                <LineChart
                    width={730}
                    height={250}
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Movements" stroke="#797ef6" />
                    <Line type="monotone" dataKey="Profit" stroke="#1aa7ec" />
                    <Line type="monotone" dataKey="Revenue" stroke="#1e2f97" />
                </LineChart>
            </div>
        </div>
    );
}

export default Reporting;
