import AssessmentIcon from "@mui/icons-material/Assessment";
import React, { useState } from "react";
import "./LoginUI.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { StyledEngineProvider, TextField } from "@mui/material";

import CircularProgress from '@mui/material/CircularProgress';
const axios = require("axios").default;
var _ = require("lodash");

const url = "https://jsonplaceholder.typicode.com/posts";

export default function LoginUI() {
    const [isLoading, setIsLoading] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
    });

    const submitHandler = (e) => {
        const url = "https://jsonplaceholder.typicode.com/posts";
        const headers = {};
        e.preventDefault();
        
        loginValues.email === '' ? setEmailError(true) : setEmailError(false)
        loginValues.password === '' ? setPasswordError(true) : setPasswordError(false)
        axios.post(url, loginValues).then(function (response) {

            response.status === 201 ? setIsLoading(true) : setIsLoading(false)
            console.log(response);
        });
        setLoginValues({
            email: "",
            password: "",
        });
    };
    return (
        <div>
            <header>
                <AssessmentIcon sx={{ fontSize: 80 }} />
                <h1>StockTake.</h1>
                {isLoading === true ? <CircularProgress className="loadingBar" size={80}/> : null}
            </header>
        
            <body >
            
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
                                        value={loginValues["email"]}
                                        onChange={(e) => {
                                            setLoginValues({
                                                ...loginValues,
                                                email: e.target.value,
                                            });
                                        }}
                                        label="Email"
                                        color="primary"
                                        focused
                                        fullWidth
                                        required
                                        error={emailError}
                                    />
                                </div>
                                <div className="passwordInput">
                                    <TextField
                                        type="password"
                                        value={loginValues["password"]}
                                        onChange={(e) => {
                                            setLoginValues({
                                                ...loginValues,
                                                password: e.target.value,
                                            });
                                        }}
                                        label="Password"
                                        color="primary"
                                        focused
                                        fullWidth
                                        required
                                        error={passwordError}
                                    />
                                </div>
                            </div>
                            <div className="registrationButton">
                                <Button
                                    variant="contained"
                                    onClick={submitHandler}
                                    fullWidth={true}
                                >
                                    Register
                                </Button>
                            </div>
                            <p className="routeLink">
                                <Link to="/">Don't have an account?</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </body>
            <footer></footer>
        </div>
    );
}
