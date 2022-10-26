import React, { useState } from "react";
import "./DashboardForm.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";


function DashboardForm({ onDashFormSubmission }) {
        const [dashBoardFormValues, setDashBoardFormValues] = useState({
        price_wholesale: "",
        price_retail: "",
        quantity: "",
        product_description: "",
        product_name: "",
    });

    const addItem = () => {
        onDashFormSubmission(dashBoardFormValues);
        setDashBoardFormValues({
            price_wholesale: "",
            price_retail: "",
            quantity: "",
            product_description: "",
            product_name: "",
        });
    };


    return (
        <div className="container">
            <div className="dashboardInputs">
                <div className="productName">
                    <TextField
                    sx={{border: '1px solid black'}}
                    className="textField"
                        label="Product name"
                        color="primary"
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
                    sx={{border: '1px solid black'}}
                    className="textField"
                        id="outlined-basic"
                        label="Wholesale price"
                        variant="outlined"
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
                    sx={{border: '1px solid black'}}
                    className="textField"
                        id="outlined-basic"
                        label="Retail price"
                        variant="outlined"
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
                    sx={{border: '1px solid black'}}
                    className="textField"
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
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
                    sx={{border: '1px solid black'}}
                    className="textField"
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
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
                    <Button
                        variant="contained"
                        onClick={() =>
                            onDashFormSubmission(dashBoardFormValues)
                        }
                    >
                        Add Item
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default DashboardForm;
