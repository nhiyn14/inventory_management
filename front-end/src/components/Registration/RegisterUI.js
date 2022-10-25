import React, { useState } from "react";
import "./RegisterUI.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { CircularProgress } from '@mui/material';
import AxiosInstance from "../../AxiosInstance/Instances";
import { useNavigate } from "react-router-dom";




const axios = require("axios").default;



export default function RegisterUI() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [registrationValues, setRegistrationValues] = useState({
        email: "",
        password: "",
        confirmedPassword: "",
        firstName: "",
        lastName: "",
    });

    const submitHandler = async (e) => {
        try {
            const response = await AxiosInstance.post('/registration', registrationValues)
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            navigate('/')
            setRegistrationValues({
                email: "",
                password: "",
                confirmedPassword: "",
                firstName: "",
                lastName: "",
            });
        }
    };
    return (
        <div>
            <header>
            <AssessmentIcon sx={{fontSize: 80}}/>
                <h1>StockTake.</h1> 
                {isLoading === true ? <CircularProgress className="loadingBar" size={80}/> : null}
            </header>
            <body className="indexBody">
                <div className="registrationContainer">
                    <div className="welcomeText">
                        <h1>Welcome to StockTake</h1>
                        <p>Where all your hopes and dreams come true</p>
                        <p> Please register your details </p>
                    </div>
                    <form className="registrationFormContents">
                        <div className="registrationInputs">
                            <div className="registrationDetail">
                                <div className="emailInput">
                                    <TextField
                                        value={registrationValues["email"]}
                                        onChange={(e) => {
                                            setRegistrationValues({
                                                ...registrationValues,
                                                email: e.target.value,
                                            });
                                        }}
                                        label="Email"
                                        color="primary"
                                        focused
                                        fullWidth
                                        size="small"
                                        required
                                    />
                                </div>
                                <div className="passwordInput">
                                    <TextField
                                        type="password"
                                        value={registrationValues["password"]}
                                        onChange={(e) => {
                                            setRegistrationValues({
                                                ...registrationValues,
                                                password: e.target.value,
                                            });
                                        }}
                                        label="Password"
                                        color="primary"
                                        focused
                                        fullWidth
                                        size="small"
                                        required
                                    />
                                </div>
                                <div className="confirmPasswordInput">
                                    <TextField
                                        type="password"
                                        value={
                                            registrationValues[
                                                "confirmedPassword"
                                            ]
                                        }
                                        onChange={(e) => {
                                            setRegistrationValues({
                                                ...registrationValues,
                                                confirmedPassword:
                                                    e.target.value,
                                            });
                                        }}
                                        label="Please re-enter your password"
                                        color="primary"
                                        focused
                                        fullWidth
                                        size="small"
                                        required
                                    />
                                </div>
                                <div className="nameInput">
                                    <TextField
                                        value={registrationValues["firstName"]}
                                        onChange={(e) => {
                                            setRegistrationValues({
                                                ...registrationValues,
                                                firstName: e.target.value,
                                            });
                                        }}
                                        label="First name"
                                        id="firstnameInput"
                                        color="primary"
                                        focused
                                        size="small"
                                        required
                                        fullWidth
                                    />
                                </div>
                                <div className="lastnameInput">
                                    <TextField
                                        value={registrationValues["lastName"]}
                                        onChange={(e) => {
                                            setRegistrationValues({
                                                ...registrationValues,
                                                lastName: e.target.value,
                                            });
                                        }}
                                        label="Second name"
                                        color="primary"
                                        focused
                                        size="small"
                                        required
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className="registrationButton">
                                <Button
                                    variant="contained"
                                    onClick={submitHandler}
                                    fullWidth={true}>
                                    Register
                                </Button>
                            </div>
                            <p className="routeLink">
                                <Link to="/">
                                    Already have an account?
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </body>
            <footer className="indexFooter">
                
            </footer>
        </div>
    );
}
