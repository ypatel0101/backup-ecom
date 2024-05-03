// src/components/Login.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail, setPassword, setToken, setErrorMessage, clearAuth } from '../store/authSlice';
import 'dotenv/config';

const Login = () => {
    const { email, password, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(API_URL + '/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                dispatch(setToken(data.token));
                navigate('/'); // This will take our user to homepage after sucessful login.
            } else {
                dispatch(setErrorMessage(data.message || 'Login failed. Please try again.'));
            }
        } catch (error) {
            dispatch(setErrorMessage('Network error. Please try again later.'));
        }
    };

    //Logout function that will clear user login info after pressing logout, then navigate will take them back to homepage.
    const handleLogout = () => {
        dispatch(clearAuth()); 
        navigate('/');
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => dispatch(setPassword(e.target.value))} required />
                </label>
                <button type="submit">Login</button>
                <button onClick={handleLogout}>Logout</button>
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Login;
