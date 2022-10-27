import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, Legend, CartesianGrid, XAxis, YAxis } from "recharts";
import { Bar, Tooltip } from "recharts";
import AxiosInstance from "../../AxiosInstance/Instances";
import "./Reporting.css";

function Reporting() {
    const [chartData, setChartData] = useState([]);
    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
        },
    ];

    const populateChart = async () => {
        try {
            const response = await AxiosInstance.get("/dashboard");
            const apiData = response.data.map((data) => ({
                Name: data.product_name,
                Retail: data.price_retail,
                Cost: data.price_wholesale,
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
                    <Bar dataKey="Retail" fill="#8884d8" />
                    <Bar dataKey="Cost" fill="#82ca9d" />
                </BarChart>
            </div>
        </div>
    );
}

export default Reporting;
