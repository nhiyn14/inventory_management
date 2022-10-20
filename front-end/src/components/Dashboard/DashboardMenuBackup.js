import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "./Menu.css";
import DashboardForm from "./DashboardForm";

const axios = require("axios");

function DashboardMenuBackup() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProductInformation = async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://dummyjson.com/products");
            const rows = response.data.products.map((row) => ({
                id: row.id,
                title: row.title,
                stock: row.stock,
                description: row.description,
            }));
            setData(rows);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProductInformation();
    }, []);

    const columns = [
        { field: "id", headerName: "id", width: 130, editable: true },
        { field: "title", headerName: "title", width: 130, editable: true },
        { field: "stock", headerName: "quantity", width: 90, editable: true },
        {
            field: "description",
            headerName: "description",
            width: 200,
            editable: true,
        },
    ];

    return (
        <div className="dashContents">
            <div className="dashboardForm">
                <DashboardForm/>
                </div>
            <div className="grid" style={{ height: 450, width: "50%" }}>
                <DataGrid rows={data} columns={columns} loading={loading} />
            </div>
        </div>
    );
}

export default DashboardMenu;
