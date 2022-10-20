import React, { useState } from "react";
import DashboardForm from "./DashboardForm";
import "./DashboardMenu.css";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DataDash from "./DataDash";
import { dialogActionsClasses } from "@mui/material";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { render } from "react-dom";
import { useEffect } from "react";

const axios = require("axios");

const staticData = [
    {
        price_wholesale: "1.1",
        price_retail: "5",
        quantity: "500",
        product_description: "candle",
        product_name: "candle",
    },
];

function DashboardMenu(props) {
    const [productData, setProductData] = useState(staticData);
    const [removeProduct, setRemoveProduct] = useState("");
    const [salesData, setSalesData] = useState({
        salesName: "",
        totalSales: "",
    });

    const populateDashMenu = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/products");
            const initialData = response.data.products.map((data) => ({
                price_wholesale: data.discountPercentage,
                price_retail: data.price,
                quantity: data.id,
                product_description: data.description,
                product_name: data.title,
            }));
            for (const objects in initialData) {
                let parsedData = initialData[objects];
                productData.push(parsedData);
            }
            console.log(productData);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        populateDashMenu();
    }, []);

    // addProduct data takes dashboardValues as a parameter (this parameter will be used in DashboardForm.js)
    const addProductData = (dashboardValues) => {
        const dashValues = { ...dashboardValues };
        setProductData((dashboardValues) => {
            return [dashValues, ...dashboardValues];
        });
        const postDashboardValues = async () => {
            const response = await axios
        }

        console.log(dashValues);
    };
    const removeProductHandler = (e) => {
        const findKey = productData.findIndex((key) => {
            return key.product_name === removeProduct;
        });
        productData.splice(findKey, 1);
        console.log(productData);
        e.preventDefault();
        setRemoveProduct("");
        console.log(salesData);
    };

    return (
        <div>
            <header className="dashHeader">
                <AssessmentIcon sx={{ fontSize: 80 }} />
                <h1>StockTake.</h1>
            </header>
            <body>
                <div className="dashContainer">
                    <div className="dashEditing">
                        <div className="dashForm">
                            <DashboardForm
                                // onDashFormSubmission will be used in dashform.js as a pointer to addproductdata function
                                onDashFormSubmission={addProductData}
                            />
                        </div>
                        <div className="dashSales">
                            <div className="salesName">
                                <TextField
                                    focused
                                    value={salesData["salesName"]}
                                    onChange={(e) => {
                                        setSalesData({
                                            ...salesData,
                                            salesName: e.target.value,
                                        });
                                    }}
                                    label="Product name"
                                />
                            </div>
                            <div className="totalSales">
                                <TextField
                                    focused
                                    value={salesData["totalSales"]}
                                    onChange={(e) => {
                                        setSalesData({
                                            ...salesData,
                                            totalSales: e.target.value,
                                        });
                                    }}
                                    label="Total sales"
                                    type="number"
                                />
                            </div>
                        </div>
                        <p>Remove Products</p>
                        <div className="dashRemove">
                            <TextField
                                focused
                                value={removeProduct}
                                onChange={(e) => {
                                    setRemoveProduct(e.target.value);
                                }}
                                label="Product name"
                            />
                        </div>
                        <div className="removeProductButton">
                            <Button
                                variant="outlined"
                                onClick={populateDashMenu}
                            >
                                Remove item
                            </Button>
                        </div>
                    </div>
                    <div className="dashMenu">
                        <div className="menuHeader">
                            <div className="dashProductName">
                                <p>Name</p>
                            </div>
                            <div className="dashProductWholesalePrice">
                                <p>Cost</p>
                            </div>
                            <div className="dashProductRetailPrice">
                                <p>Retail</p>
                            </div>
                            <div className="dashProductQuantity">
                                <p>Quantity</p>
                            </div>
                            <div className="dashproductDescription">
                                <p>Description</p>
                            </div>
                        </div>
                        {/* returning new productData array, where every dashValue is input into a DataDash component */}
                        {productData.map((dashValues) => (
                            <DataDash
                                productID={dashValues.productID}
                                productType={dashValues.productType}
                                productWholesalePrice={
                                    dashValues.price_wholesale
                                }
                                productRetailPrice={dashValues.price_retail}
                                productQuantity={dashValues.quantity}
                                productDescription={
                                    dashValues.product_description
                                }
                                productName={dashValues.product_name}
                            />
                        ))}
                    </div>
                </div>
            </body>
        </div>
    );
}

export default DashboardMenu;
