import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAuth, setUserRole, setToken, clearName, setFirstName, setLastName, } from "../store/authSlice";
import { useEffect } from "react";
import logo from './../assets/gopher-gaming.png';

const Navigation = () => {

    const { token, userRole, first_name, last_name } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

		// checks one time upon page loadup or refresh if a token exists in localStorage
		useEffect(() => {
			if (!token) dispatch(setToken(localStorage.getItem("token")))
		}, [],)

		useEffect(() => {
			// verification for user whether they are a logged in user or admin.
			// occurs everytime token changes or if the browser url changes
			const verifyUser = async () => {
				try {
					if (token) {
						const response = await fetch('/auth/verify', {
							method: 'GET',
							headers: {
								"Content-Type": "application/json",
								"Authorization": `Bearer ${token}`
							},
						})
						const json = await response.json();
						// we dispatch name because our nav bar now shows a welcome message with user name
						dispatch(setFirstName(json.first_name))
						dispatch(setLastName(json.last_name))
						if (json.role === "admin") dispatch(setUserRole("admin"))
						else if (json.role === "user") dispatch(setUserRole("user"))
						else navigate("/")
					}
				} catch(err) {
					throw err;
				}
			}
			verifyUser();
			// verify user upon site load, whenever url path changes, and whenever token changes
		}, [token, window.location.pathname]);

		const handleLogout = () => {
			dispatch(clearAuth());
			dispatch(clearName());
			localStorage.removeItem('token'); 
			navigate('/');
	};

	return (
		<>
			<div>
				<Link to = {'/'}>
						<img src = {logo} style={{width: "100px"}}alt="Gopher Gaming Logo"/>  
				</Link>
				{!userRole && <Link to = {'/login'}>Login</Link>}
				{!userRole && <Link to = {'/register'}>Register</Link>}
				{userRole && <h3>{`Welcome, ${first_name} ${last_name}!`}</h3>}
				{userRole === 'admin' && <Link to ={'/users'}>View Users</Link>}
				{userRole && <Link to = {'/cart'}>My Cart</Link>}
				{userRole && <button onClick = {handleLogout}>Logout</button>}
			</div>
		</>
	);
};

export default Navigation;