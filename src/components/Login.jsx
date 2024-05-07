// src/components/Login.jsx
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail, setPassword, setToken, setErrorMessage, clearPassword, setFirstName, setLastName } from '../store/authSlice.js';
import { Link } from 'react-router-dom';
import BackButton from './BackButton.jsx';

const Login = () => {

    const { email, password, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Just a note that storing persistent token is not Tier 1, but I don't mind.
                dispatch(setToken(data.token));
                // dispatching name again to show welcome message in nav bar
                dispatch(setFirstName(data.first_name));
                dispatch(setLastName(data.last_name));
                dispatch(clearPassword());
                navigate('/'); // This will take our user to homepage after sucessful login.
            } else {
                dispatch(setErrorMessage(data.message || 'Login failed. Please try again.'));
            }
        } catch (error) {
            dispatch(setErrorMessage('Network error. Please try again later.'));
        }
    };

    return (
        <div>
            <BackButton />
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
            </form>
            {errorMessage && <h2>{errorMessage}</h2>}
            <Link to={'/register'}><button>Don't Have an Account?</button></Link>
        </div>
    );
};

export default Login;
