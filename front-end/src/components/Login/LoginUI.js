import AssessmentIcon from "@mui/icons-material/Assessment";
import React, { useState, useSyncExternalStore } from "react";
import "./LoginUI.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import {  BrowserRouter, Route, Routes, Link, redirect } from "react-router-dom";
import { StyledEngineProvider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Context from '../../appContext'

import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
const axios = require("axios").default;
const token = sessionStorage.getItem("token")

console.log("this is your token", token);


export default function LoginUI() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [tokenError, setTokenError] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
    });
    function logMeIn(event) {
        const url = 'http://127.0.0.1:5000/login'
        axios.post(url, {loginValues}, {headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'}})
            .then((resp) => {
                if (resp.status == 200)return resp
                else alert ("there has been an error")
                console.log(resp);
                console.log(loginValues);
            })
            .then((data) => {
                console.log(data);
                console.log("this came from the backend", data.data.access_token);
                sessionStorage.setItem("token", data.data.access_token)
                if (data.status == 200 && data.data.access_token != ""){
                    navigate('/dashboard')
                } else setTokenError(true)
            }).catch((error)=>{
                console.log(error);
            })
        
 
        // setLoginValues({
        //     email: "",
        //     password: "",
        // });

        event.preventDefault();
    }

    return (
        <div>
            <header>
                <AssessmentIcon sx={{ fontSize: 80 }} />
                <h1>StockTake.</h1>
                {isLoading === true ? (
                    <CircularProgress className="loadingBar" size={80} />
                ) : null}
            </header>

            <body className="indexBody">
            
                <div className="registrationContainer">
                    <div className="welcomeText">
                        <h1>Welcome to StockTake</h1>
                        <p>Where all your hopes and dreams come true</p>
                        <p> Please register your details </p>
                    </div>

                    <form className="loginFormContents">
                        <div className="registrationInputs">
                            <div className="registrationDetail">
                                <div className="logEmailInput">
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
                                <div className="logPasswordInput">
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
                                    {tokenError === true? <p>Error: you're login details are incorrect.</p>: null}
                                </div>
                            </div>
                            <div className="loginButton">
                                <Button
                                    variant="contained"
                                    onClick={logMeIn}
                                    fullWidth={true}
                                >
                                    Login
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
