import AssessmentIcon from "@mui/icons-material/Assessment";
import React, { useState } from "react";
import "./LoginUI.css";
import Button from "@mui/material/Button";
import { BrowserRouter, Route, Routes, Link, redirect } from "react-router-dom";
import { StyledEngineProvider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import AxiosInstance from "../../AxiosInstance/Instances";

const token = sessionStorage.getItem("token");

console.log("this is your token", token);

export default function LoginUI() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [tokenError, setTokenError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginValues, setLoginValues] = useState({
        email: "",
        password: "",
    });
    const logMeIn = async (event) => {
        try {
            const response = await AxiosInstance.post("/login", loginValues);
            console.log(response);
            sessionStorage.setItem("token", response.data.access_token);
            AxiosInstance.defaults.headers["Authorization"] = `Bearer ${response.data.access_token}`;
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setTokenError(false);
        }
        setLoginValues({
            email: "",
            password: "",
        });

        event.preventDefault();
    };

    return (
        <div>
            <header>
                <AssessmentIcon sx={{ fontSize: 80 }} />
                <h1>StockMate.</h1>
                {isLoading === true ? (
                    <CircularProgress className="loadingBar" size={80} />
                ) : null}
            </header>
            <div className="indexBody">
                <div className="loginContainer">
                    <div className="welcomeText">
                        <h1>Welcome to StockMate</h1>
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
                                    {tokenError === true ? (
                                        <p>
                                            Error: you're login details are
                                            incorrect.
                                        </p>
                                    ) : null}
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
                                <Link to="/registration">
                                    Don't have an account?
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <footer className="indexFooter"></footer>
        </div>
    );
}
