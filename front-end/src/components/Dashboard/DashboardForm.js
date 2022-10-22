import React, { useState } from "react";
import "./DashboardForm.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import authorizedCall from '../../AxiosInstance/Instances'
import AxiosInstance from "../../AxiosInstance/Instances";


function DashboardForm({onDashFormSubmission}) {
    const [isLoading, setIsLoading] = useState(false)
    const [dashBoardFormValues, setDashBoardFormValues] = useState({
        price_wholesale: "",
        price_retail: "",
        quantity: "",
        product_description: "",
        product_name: "",
});

    const addItem = async () => {
        try {
            setIsLoading(true)
            const response = await AxiosInstance.post("dashboard", dashBoardFormValues);
            onDashFormSubmission(dashBoardFormValues);
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
            
        }
    };

    return (
        <div className="container">
            <div className="dashboardInputs">
                <div className="productName">
                    <TextField
                        label="Product name"
                        color="primary"
                        focused
                        fullWidth
                        required
                        value={dashBoardFormValues["product_name"]}
                        onChange={(e) => {
                            setDashBoardFormValues({
                                ...dashBoardFormValues,
                                product_name: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="productWholesalePrice">
                    <TextField
                        id="outlined-basic"
                        label="Wholesale price"
                        variant="outlined"
                        focused
                        type="number"
                        required
                        value={dashBoardFormValues["price_wholesale"]}
                        onChange={(e) => {
                            setDashBoardFormValues({
                                ...dashBoardFormValues,
                                price_wholesale: e.target.value,
                            });
                        }}
                    />
                </div>
                <div></div>
                <div className="productRetailPrice">
                    <TextField
                        id="outlined-basic"
                        label="Retail price"
                        variant="outlined"
                        focused
                        type="number"
                        required
                        value={dashBoardFormValues["price_retail"]}
                        onChange={(e) => {
                            setDashBoardFormValues({
                                ...dashBoardFormValues,
                                price_retail: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="productQuantity">
                    <TextField
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        focused
                        type="number"
                        required
                        value={dashBoardFormValues["quantity"]}
                        onChange={(e) => {
                            setDashBoardFormValues({
                                ...dashBoardFormValues,
                                quantity: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="product_description">
                    <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        focused
                        required
                        fullWidth
                        multiline
                        value={dashBoardFormValues["product_description"]}
                        maxRows={4}
                        onChange={(e) => {
                            setDashBoardFormValues({
                                ...dashBoardFormValues,
                                product_description: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="dashboardFormButton">
                    <Button variant="outlined" onClick={() => onDashFormSubmission(dashBoardFormValues)}>
                        Add Item
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DashboardForm;
