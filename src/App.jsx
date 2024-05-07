import { Route, Routes } from 'react-router-dom';
import AllGames from './components/AllGames.jsx';
import SingleGame from './components/SingleGame.jsx';
import AllUsers from './components/AllUsers.jsx';
import OpenCart from './components/OpenCart.jsx';
import CheckoutConfirmation from './components/CheckoutConfirmation.jsx';
import Login from './components/Login.jsx';
import Footer from './components/Footer.jsx'
import Navigation from './components/Navigation.jsx';
import Register from './components/Register.jsx';
import AdminSingleGame from './components/AdminSingleGame.jsx';

function App() {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path = '/' element = {<AllGames />} />
				<Route path = '/games/:id' element = {<SingleGame />} />
				<Route path = '/users' element = {<AllUsers />} />
				<Route path = '/cart' element = {<OpenCart />} />
				<Route path = '/cart/confirmation' element = {<CheckoutConfirmation />} />
				<Route path = '/login' element = {<Login />} />
				<Route path = '/register' element = {<Register />} />
				<Route path = '/admingames/:id' element = {<AdminSingleGame />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
