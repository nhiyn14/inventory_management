import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, Legend, CartesianGrid, XAxis, YAxis } from "recharts";
import { Bar, Tooltip } from "recharts";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AxiosInstance from "../../AxiosInstance/Instances";
import "./Reporting.css";

function Reporting() {
    const [chartData, setChartData] = useState([]);
    const [dateValue, setDateValue] = useState({
      dateStart: "",
      dateEnd: "",
    })

    const populateChart = async () => {
        try {
            const response = await AxiosInstance.get("/report1");
            const apiData = response.data.map((data) => ({
                Name: data.product_name,
                Movements: data.sold_quantity,
                Profit: data.total_profit,
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
          <div className="datePickers">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Basic example"
                    value={dateValue['dateStart']}
                    onChange={(e) => {
                        setDateValue({
                          ...dateValue,
                          dateStart: e.target.value
                        })
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Basic example"
                    value={dateValue['dateEnd']}
                    onChange={(e) => {
                        setDateValue({
                          ...dateValue,
                          dateEnd: e.target.value
                        })
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            
            </div>
            <div className="reportChart">
                <BarChart width={730} height={250} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Movements" fill="#8884d8" />
                    <Bar dataKey="Profit" fill="#82ca9d" />
                </BarChart>
            </div>
        </div>
    );
}

export default Reporting;
