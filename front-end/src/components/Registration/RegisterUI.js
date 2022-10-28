import React, { useState } from "react";
import "./RegisterUI.css";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AxiosInstance from "../../AxiosInstance/Instances";



export default function RegisterUI() {
    const [textfieldError, setTextfieldError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [registrationValues, setRegistrationValues] = useState({
        email: "",
        password: "",
        confirmedPassword: "",
        firstName: "",
        lastName: "",
    });

    const submitHandler = async (e) => {
        try {
            const response = await AxiosInstance.post(
                "/registration",
                registrationValues
            );
            if (response.status === 200) {
                setHelperText("New account created!");
            }
        } catch (error) {
            if (error.request.status === 409) {
                setHelperText("Oops! Please re-check your details");
                setTextfieldError(true);
            }
        } finally {
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
                <AssessmentIcon sx={{ fontSize: 80 }} />
                <h1>StockMate.</h1>
            </header>
            <div className="indexBody">
                <div className="registrationContainer">
                    <div className="welcomeText">
                        <h1>Welcome to StockMate</h1>
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
                                            setTextfieldError(false);
                                            setHelperText("");
                                        }}
                                        label="Email"
                                        color="primary"
                                        focused
                                        fullWidth
                                        size="small"
                                        required
                                        error={textfieldError}
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
                                        error={textfieldError}
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
                                        error={textfieldError}
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
                                        error={textfieldError}
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
                                        error={textfieldError}
                                    />
                                </div>
                            </div>
                            <p className="helperText">
                                {helperText ? helperText : null}
                            </p>
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
                                <Link to="/">Already have an account?</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <footer className="indexFooter"></footer>
        </div>
    );
}
