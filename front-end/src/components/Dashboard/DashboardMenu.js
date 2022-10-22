import React, { useState } from "react";
import DashboardForm from "./DashboardForm";
import "./DashboardMenu.css";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DataDash from "./DataDash";
import { dialogActionsClasses } from "@mui/material";
import {
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import { render } from "react-dom";
import { useEffect } from "react";
import AxiosInstance from "../../AxiosInstance/Instances";
const axios = require("axios");

function DashboardMenu(props) {
    const [productData, setProductData] = useState([]);
    const [removeProduct, setRemoveProduct] = useState("");
    const [salesData, setSalesData] = useState({
        salesName: "",
        totalSales: "",
    });



    const populateDashMenu = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/products");
            const initialData = response.data.products.map((data) => ({
                product_id: data.id,
                price_wholesale: data.discountPercentage,
                price_retail: data.price,
                quantity: data.stock,
                product_description: data.description,
                product_name: data.title,
            }));
            const productData2 = [];
            for (const objects in initialData) {
                let parsedData = initialData[objects];
                productData2.push(parsedData);
            }
            setProductData(productData2);
            console.log(productData2);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        populateDashMenu();
    }, []);

    // addProduct data takes dashboardValues as a parameter (this parameter will be used in DashboardForm.js)
    const addProductData = (newItemValue) => {
        // const dashValues = { ...dashboardValues };
        // Call ciennas api, needs to send back 'ok' with product id, replace line below with proper ID.
        newItemValue.id = productData.length + 1;
        setProductData((oldProductData) => {
            return [newItemValue, ...oldProductData];
        });

        console.log(newItemValue);
    };
    const removeProductHandler = (e) => {
        const findKey = productData.findIndex((key) => {
            return key.product_name === removeProduct;
        });
        productData.splice(findKey, 1);
        console.log(productData);
        e.preventDefault();
        setRemoveProduct("");
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
                        <div className="dashRemove">
                            <FormControl fullWidth>
                                <InputLabel>
                                    Please select the product you would like to
                                    remove
                                </InputLabel>
                                <Select
                                    label="Please select the product you would like to remove"
                                    value={removeProduct}
                                    onChange={(e) => {
                                        setRemoveProduct(e.target.value);
                                    }}
                                > 
                                {productData.map((data)=> (
                                    <MenuItem value={data.product_name}>{data.product_name}</MenuItem>
                                ))}
                                </Select>
                                <div className="removeProductButton">
                                    <Button
                                        variant="outlined"
                                        onClick={removeProductHandler}
                                    >
                                        Remove item
                                    </Button>
                                </div>
                            </FormControl>
                        </div>
                        {/* <div className="dashRemove">
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
                        </div> */}
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
