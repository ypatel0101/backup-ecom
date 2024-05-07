import { Link } from 'react-router-dom'

const Footer = () => {
	return (
	<>
		<div>
			<ol>
				<h4>GOPHER GAMING</h4>
				<li><Link to={`https://dapper-froyo-0ab2d7.netlify.app/`}>PLAY AZUL</Link></li>
				<li>FAQ</li>
				<li>Contact Us</li>
				<li>Leave a Review</li>
				<h4>THANK YOU FOR SHOPPING!</h4>
			</ol>
		</div>
	</>
	)
};

export default Footer;