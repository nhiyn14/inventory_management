import React, { useState } from "react";
import "./DashboardForm.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import AxiosInstance from "../../AxiosInstance/Instances";
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";

export default function UpdateProductForm(
    { onUpdateFormSubmission },
    {updateProductData}
)

{
    const [isLoading, setIsLoading] = useState(false);
    const [updateFormValues, setUpdateFormValues] = useState({
        price_wholesale: "",
        price_retail: "",
        quantity: "",
        product_description: "",
        product_name: "",
    });

    const updateItemHandler = () => {
        console.log(updateProductData);
        onUpdateFormSubmission(updateFormValues);
        setUpdateFormValues({
            price_wholesale: "",
            price_retail: "",
            quantity: "",
            product_description: "",
            product_name: "",
        });
    };
    console.log(updateProductData);
    return (
        <div className="container">
            <div className="dashboardInputs">
                <div className="productName">
                    <FormControl fullWidth>
                        <InputLabel>Add sales</InputLabel>
                        <Select
                            label="Add sales"
                            value={updateFormValues["product_name"]}
                            onChange={(e) => {
                                setUpdateFormValues({
                                    ...updateFormValues,
                                    product_name: e.target.value,
                                });
                            }}
                        >
                            {updateProductData && updateProductData.map((data) => (
                                <MenuItem focused value={data.product_name}>
                                    {data.product_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="productWholesalePrice">
                    <TextField
                        id="outlined-basic"
                        label="Wholesale price"
                        variant="outlined"
                        type="number"
                        required
                        value={updateFormValues["price_wholesale"]}
                        onChange={(e) => {
                            setUpdateFormValues({
                                ...updateFormValues,
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
                        type="number"
                        required
                        value={updateFormValues["price_retail"]}
                        onChange={(e) => {
                            setUpdateFormValues({
                                ...updateFormValues,
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
                        type="number"
                        required
                        value={updateFormValues["quantity"]}
                        onChange={(e) => {
                            setUpdateFormValues({
                                ...updateFormValues,
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
                        required
                        fullWidth
                        multiline
                        value={updateFormValues["product_description"]}
                        maxRows={4}
                        onChange={(e) => {
                            setUpdateFormValues({
                                ...updateFormValues,
                                product_description: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="dashboardFormButton">
                    <Button
                        variant="contained"
                        onClick={() => onUpdateFormSubmission(updateFormValues)}
                    >
                        Update Item
                    </Button>
                </div>
            </div>
        </div>
    );
}
