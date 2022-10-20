import React, { useState } from "react";
import "./DashboardForm.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import authorizedCall from '../../AxiosInstance/Instances'
import AxiosInstance from "../../AxiosInstance/Instances";


function DashboardForm(props) {
    const [dashboardValues, setDashboardValues] = useState({
        price_wholesale: "",
        price_retail: "",
        quantity: "",
        product_description: "",
        product_name: "",
});

    const addItem = async () => {
        // try {
        //     const response = await AxiosInstance.get("dashboardTest");
        //     props.onDashFormSubmission(dashboardValues);
        //     console.log(response);
        // } catch (error) {
        //     console.log(error);
        // } finally {
        //     // pointer to addProductData function, passing through form values as a paramter
            
        // }
        props.onDashFormSubmission(dashboardValues)
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
                        value={dashboardValues["product_name"]}
                        onChange={(e) => {
                            setDashboardValues({
                                ...dashboardValues,
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
                        value={dashboardValues["price_wholesale"]}
                        onChange={(e) => {
                            setDashboardValues({
                                ...dashboardValues,
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
                        value={dashboardValues["price_retail"]}
                        onChange={(e) => {
                            setDashboardValues({
                                ...dashboardValues,
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
                        value={dashboardValues["quantity"]}
                        onChange={(e) => {
                            setDashboardValues({
                                ...dashboardValues,
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
                        value={dashboardValues["product_description"]}
                        maxRows={4}
                        onChange={(e) => {
                            setDashboardValues({
                                ...dashboardValues,
                                product_description: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="dashboardFormButton">
                    <Button variant="outlined" onClick={addItem}>
                        Add Item
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DashboardForm;
