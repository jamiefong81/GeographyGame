import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'
import Axios from 'axios';

function Login(props) {
    const [haveAccount, setHaveAccount] = useState(null);
    const [loginError, setLoginError] = useState(false);

    async function createAccount() {
        const userName = document.getElementById("userName").value;
        const userPassword = document.getElementById("userPassword").value;
        const postData = {
            username: userName,
            password: userPassword
        };

        try {
            await Axios.post("http://localhost:9000/createlogin", JSON.stringify(postData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            props.setUsername(userName);
            props.setAuthenticated(true);
        } catch (error) {
            setLoginError(true);
        }
    }

    function displayExistingUserError(errorMessage) {
        if (loginError) {
            return (
                <p class="login-error-message">{errorMessage}</p>
            )
        }
    }

    function welcomePrompt() {
        if (haveAccount === null) {
            return (
                <div class="login-page d-flex justify-content-center align-items-center">
                    <h1 id="welcome-message">Welcome! Login or create an account to play.</h1>
                    <button type="button" class="btn btn-primary btn-lg" onClick={() => setHaveAccount(false)}>Create Account</button>
                    <button type="button" class="btn btn-primary btn-lg" onClick={() => setHaveAccount(true)}>Log In</button>
                </div>
            )
        }
    }

    function createAccountPage() {
        if (!haveAccount) {
            return (
                <div>
                    <h1 class="action-message">Sign Up</h1>
                    <div class="form-group">
                        <form>
                            <div class="form-group">
                                <h3 id="welcome-message">Username</h3>
                                <input type="email" class="form-control" id="userName" placeholder="Enter username" />
                            </div>
                        </form>
                    </div>
                    <div class="form-group">
                        <h3 id="welcome-message">Password</h3>
                        <input type="password" class="form-control" id="userPassword" placeholder="Enter Password" />
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={() => createAccount()}>Submit</button>
                    {displayExistingUserError("Username already exists.")}
                </div>
            )
        }
    }

    async function login() {
        const username = document.getElementById("loginUser").value;
        const password = document.getElementById("loginPassword").value;
        const postData = {
            username: username,
            password: password
        };

        try {
            await Axios.post("http://localhost:9000/login", JSON.stringify(postData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            props.setUsername(username);
            props.setAuthenticated(true);
        } catch (error) {
            setLoginError(true);
        }
    }

    function loginPage() {
        if (haveAccount) {
            return (
                <div>
                    <div>
                        <h1 class="action-message">Log In</h1>
                        <div class="form-group">
                            <form>
                                <div class="form-group">
                                    <h3 id="welcome-message">Username</h3>
                                    <input type="email" class="form-control" id="loginUser" placeholder="Enter username" />
                                </div>
                            </form>
                        </div>
                        <div class="form-group">
                            <h3 id="welcome-message">Password</h3>
                            <input type="password" class="form-control" id="loginPassword" placeholder="Enter Password" />
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={() => login()}>Submit</button>
                        {displayExistingUserError("Incorrect username or password")}
                    </div>
                </div>
            )
        }
    }

    function renderPage() {
        if (haveAccount === null) {
            return welcomePrompt();
        } else if (!haveAccount) {
            return createAccountPage();
        } else {
            return loginPage();
        }
    }

    return (
        <div class="login-page d-flex justify-content-center align-items-center">
            {renderPage()}
        </div>
    )
}

export default Login;