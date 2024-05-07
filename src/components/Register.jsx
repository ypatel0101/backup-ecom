import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setFirstName, setLastName, setEmail, setPassword, setToken, setErrorMessage, clearPassword } from '../store/authSlice.js';
import BackButton from './BackButton.jsx';

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { first_name, last_name, email, password, errorMessage } = useSelector(state => state.auth);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/auth/register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, first_name, last_name })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
        dispatch(clearPassword());
        navigate('/');
      } else if (data.message === "Email already in use."){
        dispatch(setErrorMessage(data.message || "Email already in use."))
      } else dispatch(setErrorMessage(data.message || 'Register failed. Please try again.'));
    } catch(err) {
      dispatch(setErrorMessage('Network error. Please try again later.'))
    }
  }

  return (
    <>
      <div>
        <BackButton />
        <h1>Register</h1>
        <form onSubmit ={ handleRegister }>
          <label>
            First Name:
            <input type="text" value = {first_name} onChange={(e) => dispatch(setFirstName(e.target.value))} required />
          </label>
          <label>
            Last Name:
            <input type="text" value = {last_name} onChange={(e) => dispatch(setLastName(e.target.value))} required />
          </label>
          <label>
            Email:
            <input type="email" value = {email} onChange={(e) => dispatch(setEmail(e.target.value))} required />
          </label>
          <label>
            Password:
            <input type="password" value = {password} onChange={(e) => dispatch(setPassword(e.target.value))} required />
          </label>
          <button type="submit">Register</button>
        </form>
        {errorMessage && <h2>{errorMessage}</h2>}
        <Link to={'/login'}><button>Have an Account?</button></Link>
      </div>
    </>
  )
}

export default Register