import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "./DashboardForm.css";

export default function DashboardForm() {
    const [productInformation, setProductInformation] = useState({
        product_description: '',
        product_id: '',
        product_price: '',
        product_status: '',
        product_quantity: '',
        product_sales: '',
    })

    const SubmitHandler = (e) => {
        e.preventDefault();

        setProductInformation(" ")


    };

    return (
        <header>
            hello
        </header>
        <form className="dashboard_form">
            <div className="product_description">
                <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    value={productInformation["product_description"]}
                    onChange={(e) => {
                        setProductInformation({
                            ...productInformation,
                            product_description: e.target.value,
                        });
                    }}
                />

                <TextField
                    id="outlined-basic"
                    label="Product ID"
                    variant="outlined"
                    value={productInformation['product_id']}
                    onChange={(e) => {
                        setProductInformation({
                            product_id: e.target.value
                        })
                    }}
                />

                <TextField
                    id="outlined-basic"
                    label="Retail price"
                    variant="outlined"
                    value={productInformation["product_price"]}
                    onChange={(e) => {
                        setProductInformation({
                            product_price: e.target.value
                        })
                    }}
                />

                <TextField
                    id="outlined-basic"
                    label="Product status"
                    variant="outlined"
                    value={productInformation['product_status']}
                    onChange={(e) => {
                        setProductInformation({
                            product_status: e.target.value
                        })
                    }}
                />

                <TextField
                    id="outlined-basic"
                    label="Quantity"
                    variant="outlined"
                    value={productInformation["product_quantity"]}
                    onChange={(e) => {
                        setProductInformation({
                            product_quantity: e.target.value
                        })
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Total sales"
                    variant="outlined"
                    value={productInformation["product_sales"]}
                    onChange={(e) => {
                        setProductInformation({
                            product_sales: e.target.value
                        })
                    }}
                />
            </div>
            <Button variant="outlined" onClick={SubmitHandler}>
                Add stock
            </Button>
        </form>
    );
}
