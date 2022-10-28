import React, { useState } from "react";
import DashboardForm from "./DashboardForm";
import "./DashboardMenu.css";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DataDash from "./DataDash";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
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
import { makeStyles } from "@mui/styles";
import Reporting from "../Reporting/Reporting";
import { gridVisibleTopLevelRowCountSelector } from "@mui/x-data-grid";

const useStyles = makeStyles({
    input: {
        backgroundColor: "white",
        borderRadius: "10px",
        border: "1px solid black",
    },
});

const token = sessionStorage.getItem("token");

function DashboardMenu(props) {
    const [switchText, setSwitchText] = useState("Generate Report")
    const [renderChart, setRenderChart] = useState(false);
    const navigate = useNavigate();
    const styles = useStyles();

    const [updateFormValues, setUpdateFormValues] = useState({
        price_wholesale: "",
        price_retail: "",
        quantity: "",
        product_description: "",
        product_name: "",
    });
    const [logOutLoading, setLogOutLoading] = useState(false);
    const [dashLoading, setDashLoading] = useState(false);
    const [productData, setProductData] = useState([]);
    const [removeProduct, setRemoveProduct] = useState({ product_name: "" });
    const [salesData, setSalesData] = useState({
        salesName: "",
        totalSales: "",
    });
    const chartHandler = (e) => {
        setRenderChart(e.target.checked)
        if (renderChart === true){
            setSwitchText("Generate report")
        } else {
            setSwitchText("Generate stock information")
        }
    }
    const addSalesHandler = async () => {
        try {
            const response = await AxiosInstance.post("/newsales", salesData);
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setSalesData({
                salesName: "",
                totalSales: "",
            });
            populateDashMenu();
        }
        console.log(salesData);
    };
    const updateProductHandler = async () => {
        try {
            setDashLoading(true);
            const response = await AxiosInstance.post(
                "/updateproduct",
                updateFormValues
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setDashLoading(false);
            populateDashMenu();
            setUpdateFormValues("");
        }
        console.log(updateFormValues);
    };
    const logMeOut = () => {
        setLogOutLoading(true);
        sessionStorage.removeItem("token");
        setTimeout(navigate("/"), 2000);
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
                product_status: data.product_status,
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
        console.log(productData);
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
            setDashLoading(true);
            const response = await AxiosInstance.post(
                "/deleteproduct",
                removeProduct
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setDashLoading(false);
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
                <h1>StockMate.</h1>
            </header>
            <div className="dashBody">
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
                                    <InputLabel></InputLabel>
                                    <Select
                                        className={styles.input}
                                        label="Add sales"
                                        value={salesData["salesName"]}
                                        onChange={(e) => {
                                            setSalesData({
                                                ...salesData,
                                                salesName: e.target.value,
                                            });
                                        }}
                                    >
                                        {productData.map((data) => (
                                            <MenuItem
                                                focused
                                                value={data.product_name}
                                                key={data.product_id}
                                            >
                                                {data.product_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="totalSales">
                                <TextField
                                    InputLabelProps={{ shrink: false }}
                                    sx={{ border: "1px solid black" }}
                                    className={styles.input}
                                    value={salesData["totalSales"]}
                                    onChange={(e) => {
                                        setSalesData({
                                            ...salesData,
                                            totalSales: e.target.value,
                                        });
                                    }}
                                    label={
                                        salesData["totalSales"] === ""
                                            ? "Add sales"
                                            : ""
                                    }
                                    type="number"
                                />
                                <Button
                                    variant="contained"
                                    className="salesButton"
                                    onClick={addSalesHandler}
                                >
                                    Add sale
                                </Button>
                            </div>
                        </div>
                        <div className="dashRemove">
                            <div className="removeInput">
                                <FormControl fullWidth>
                                    <InputLabel></InputLabel>
                                    <Select
                                        sx={{ border: "1px solid black" }}
                                        className="textfield"
                                        label="Remove products"
                                        value={removeProduct["product_name"]}
                                        onChange={(e) => {
                                            setRemoveProduct({
                                                product_name: e.target.value,
                                            });
                                        }}
                                    >
                                        {productData.map((data) => (
                                            <MenuItem
                                                value={data.product_name}
                                                key={data.product_id}
                                            >
                                                {data.product_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="removeProductButton">
                                <Button
                                    variant="contained"
                                    onClick={removeProductHandler}
                                >
                                    Remove item
                                </Button>
                            </div>
                        </div>
                        <div className="container">
                            <div className="updateInputs">
                                <div className="productName">
                                    <FormControl fullWidth>
                                        <InputLabel></InputLabel>
                                        <Select
                                            className={styles.input}
                                            label="Update products"
                                            value={
                                                updateFormValues["product_name"]
                                            }
                                            onChange={(e) => {
                                                setUpdateFormValues({
                                                    ...updateFormValues,
                                                    product_name:
                                                        e.target.value,
                                                });
                                            }}
                                        >
                                            {productData &&
                                                productData.map((data) => (
                                                    <MenuItem
                                                        value={
                                                            data.product_name
                                                        }
                                                        key={data.product_id}
                                                    >
                                                        {data.product_name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="productWholesalePrice">
                                    <TextField
                                        InputLabelProps={{ shrink: false }}
                                        sx={{ border: "1px solid black" }}
                                        className={styles.input}
                                        id="outlined-basic"
                                        label={
                                            updateFormValues[
                                                "price_wholesale"
                                            ] === ""
                                                ? "Cost price"
                                                : ""
                                        }
                                        variant="outlined"
                                        type="number"
                                        value={
                                            updateFormValues["price_wholesale"]
                                        }
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
                                        InputLabelProps={{ shrink: false }}
                                        sx={{ border: "1px solid black" }}
                                        className={styles.input}
                                        id="outlined-basic"
                                        label={
                                            updateFormValues["price_retail"] ===
                                            ""
                                                ? "Retail price"
                                                : ""
                                        }
                                        variant="outlined"
                                        type="number"
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
                                        InputLabelProps={{ shrink: false }}
                                        sx={{ border: "1px solid black" }}
                                        className={styles.input}
                                        id="outlined-basic"
                                        label={
                                            updateFormValues["quantity"] === ""
                                                ? "Quantity"
                                                : ""
                                        }
                                        variant="outlined"
                                        type="number"
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
                                        InputLabelProps={{ shrink: false }}
                                        sx={{ border: "1px solid black" }}
                                        className={styles.input}
                                        id="outlined-basic"
                                        label={
                                            updateFormValues[
                                                "product_description"
                                            ] === ""
                                                ? "Description"
                                                : ""
                                        }
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        value={
                                            updateFormValues[
                                                "product_description"
                                            ]
                                        }
                                        maxRows={4}
                                        onChange={(e) => {
                                            setUpdateFormValues({
                                                ...updateFormValues,
                                                product_description:
                                                    e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="updateButton">
                                    <Button
                                        variant="contained"
                                        onClick={updateProductHandler}
                                    >
                                        Update Item
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="renderChart">
                        <Switch className="chartSwitch"
                        color="secondary"
                        size="large"
                        checked={renderChart}
                        onChange={chartHandler}/>
                        <p>{switchText}</p>
                        </div>
                    </div>
                    <div className="dashMenu">
                        {renderChart === false ? <div className="menuHeader">
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
                        </div> : null}
                        {renderChart === true ? <Reporting/> : productData.map((dashValues) => (
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
                                key={dashValues.product_id}
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
            </div>
        </div>
    );
}

export default DashboardMenu;
