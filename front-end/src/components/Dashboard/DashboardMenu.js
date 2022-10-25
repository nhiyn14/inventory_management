import React, { useState } from "react";
import DashboardForm from "./DashboardForm";
import "./DashboardMenu.css";
import LogoutIcon from "@mui/icons-material/Logout";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DataDash from "./DataDash";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate, useNavigate } from "react-router-dom";
import {
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import AxiosInstance from "../../AxiosInstance/Instances";
const axios = require("axios");
const token = sessionStorage.getItem("token");

function DashboardMenu() {
    const navigate = useNavigate(false);
    const [logOutLoading, setLogOutLoading] = useState(false);
    const [dashLoading, setDashLoading] = useState(false);
    const [productData, setProductData] = useState([]);
    const [removeProduct, setRemoveProduct] = useState({product_name: ""});
    const [salesData, setSalesData] = useState({
        salesName: "",
        totalSales: "",
    });
    const addSalesHandler = async () => {
        try {
            const response = await AxiosInstance.post('/newproduct', salesData)
            console.log(response);
        } catch (error) {
            console.log(error);
        }finally {
            setSalesData({
                salesName: "",
                totalSales: ""
            })
            populateDashMenu();
        }
        console.log(salesData);
    }

    const logMeOut = () => {
        setLogOutLoading(true)
        sessionStorage.removeItem("token")
        setTimeout(navigate('/'), 2000)
    };

    const populateDashMenu = async () => {
        try {
            setDashLoading(true);
            const response = await AxiosInstance.get("/dashboard");
            const initialData = response.data.map((data) => ({
                product_id: data.id,
                price_wholesale: data.price_wholesale,
                price_retail: data.price_retail,
                quantity: data.quantity,
                product_description: data.product_description,
                product_name: data.product_name,
                product_status: data.product_status
            }));
            const productData2 = [];
            for (const objects in initialData) {
                let parsedData = initialData[objects];
                productData2.push(parsedData);
            }
            setProductData(productData2);
        } catch (error) {
            console.log(error);
        } finally {
            setDashLoading(false);
        }
    };
    useEffect(() => {
        populateDashMenu();
    }, []);

    // addProduct data takes dashboardValues as a parameter (this parameter will be used in DashboardForm.js)
    const addProductData = async (newItemValue) => {
        console.log(newItemValue);
        try {
            const response = await AxiosInstance.post(
                "/newproduct",
                newItemValue
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            populateDashMenu();
        }
    };
    const removeProductHandler = async (e) => {
        const findKey = productData.findIndex((key) => {
            return key.product_name === removeProduct;
        });
        productData.splice(findKey, 1);
        try {
            setDashLoading(true)
            const response = await AxiosInstance.post(
                "/deleteproduct", removeProduct
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setDashLoading(false)
            populateDashMenu();
            setRemoveProduct("");
        }
        console.log(removeProduct);
    };

    return (
        <div className="dashboard">
            <header className="dashHeader">
                <AssessmentIcon sx={{ fontSize: 80 }} />
                {logOutLoading === false ? (
                    <div className="logoutIcon">
                        <LogoutIcon
                            onClick={logMeOut}
                            className="logoutIcon"
                            sx={{ fontSize: 40 }}
                        />
                        <p onClick={logMeOut}>Logout</p>
                    </div>
                ) : (
                    <CircularProgress className="logLoading" />
                )}
                <h1>StockTake.</h1>
            </header>
            <body className="dashBody">
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
                                <FormControl fullWidth>
                                    <InputLabel>Add sales</InputLabel>
                                    <Select
                                        label="Please select the product you would like to remove"
                                        value={salesData['salesName']}
                                        onChange={(e) => {
                                            setSalesData({
                                                ...salesData,
                                                salesName: e.target.value
                                            })
                                        }}
                                    >
                                        {productData.map((data) => (
                                            <MenuItem
                                                focused
                                                value={data.product_name}
                                            >
                                                {data.product_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="totalSales">
                                <TextField
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
                                <Button
                                    variant="contained"
                                    className="salesButton"
                                    onClick={addSalesHandler}>
                                    Add sale
                                </Button>
                            </div>
                        </div>
                        <div className="dashRemove">
                            <FormControl fullWidth>
                                <InputLabel>
                                    Please select the product you would like to
                                    remove
                                </InputLabel>
                                <Select
                                    defaultValue={""}
                                    className="removeSelect"
                                    label="Please select the product you would like to remove"
                                    value={removeProduct['product_name']}
                                    onChange={(e) => {
                                        setRemoveProduct({
                                            product_name: e.target.value
                                        })
                                    }}
                                >
                                    {productData.map((data) => (
                                        <MenuItem
                                            value={data.product_name}>
                                            {data.product_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <div className="removeProductButton">
                                    <Button
                                        variant="contained"
                                        onClick={removeProductHandler}
                                    >
                                        Remove item
                                    </Button>
                                </div>
                            </FormControl>
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
                        {dashLoading === true ? (
                            <CircularProgress
                                className="dashLoading"
                                size={80}
                            />
                        ) : null}
                    </div>
                </div>
            </body>
        </div>
    );
}

export default DashboardMenu;
