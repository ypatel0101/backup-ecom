import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCheckoutStatus } from '../store/cartSlice.js';

const CheckoutConfirmation = () => {

  const dispatch = useDispatch();
  useEffect(() => {dispatch(setCheckoutStatus(false))}, [],)
  
  return (
    <>
      <h1>🎉 THANK YOU FOR SHOPPING WITH US! 🎉</h1>
      <Link to={"/"}>Back to Homepage</Link>
    </>
  )
}

export default CheckoutConfirmation