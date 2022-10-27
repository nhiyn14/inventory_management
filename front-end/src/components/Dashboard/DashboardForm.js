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
                    InputLabelProps={{shrink: false}}
                    sx={{border: '1px solid black'}}
                    className="textField"
                        label={dashBoardFormValues['product_name'] === "" ? "Product name" : ""}
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
                    InputLabelProps={{shrink: false}}
                    sx={{border: '1px solid black'}}
                    className="textField"
                        id="outlined-basic"
                        label={dashBoardFormValues["price_wholesale"] === "" ? "Cost price" : ""}
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
                    InputLabelProps={{shrink: false}}
                    sx={{border: '1px solid black'}}
                    className="textField"
                        id="outlined-basic"
                        label={dashBoardFormValues["price_retail"] === "" ? "Retail price" : ""}
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
                    InputLabelProps={{shrink: false}}
                    sx={{border: '1px solid black'}}
                    className="textField"
                        id="outlined-basic"
                        label={dashBoardFormValues["quantity"] === "" ? "Quantity" : ""}
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
                    InputLabelProps={{shrink: false}}
                    sx={{border: '1px solid black'}}
                    className="textField"
                        id="outlined-basic"
                        label={dashBoardFormValues["product_description"] === "" ? "Description" : ""}
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
