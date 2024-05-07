import { useDispatch, useSelector } from 'react-redux';
import { setOpenCart, setCheckoutStatus } from './../store/cartSlice.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IndCartGameCard from './IndCartGameCard.jsx';
import BackButton from './BackButton.jsx';

// util function for displaying quantity of same items in a cart
const cartQuantityHelper = (cart) => {
  const displayCart = [];
  cart.forEach((cartGame) => {
    const displayCartIndex = displayCart.findIndex(displayCartGame => cartGame.id === displayCartGame.id)
    if (displayCartIndex === -1) {
      displayCart.push({...cartGame});
      displayCart[displayCart.length - 1].quantity = 1;
    } else displayCart[displayCartIndex].quantity++;
  })
  return displayCart;
}
// small util for calculating total
const calcTotal = cart => cart.reduce((total, cart) => total + cart.price, 0) / 100;

// extra defense against double checkout clicks...
let localCheckoutStatus = false;

const OpenCart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openCart, checkoutStatus} = useSelector(state => state.cart);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const getOpenCart = async () => {
      // upon page load, get user's open cart
      const response = await fetch('/api/v1/cart', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      const cart = await response.json();
      // if cart does not exist, create cart
      if (cart.message === "no cart") {
        const response = await fetch('/api/v1/cart', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        })
        const json = await response.json();
        // an empty array representing an empty cart
        if (json.message === 'success') dispatch(setOpenCart([]))
        // TODO: write error handling to handle server error of not creating cart perhaps
      } else if (cart.message === "empty cart") dispatch(setOpenCart([]))
      else dispatch(setOpenCart(cart.openCart));
    }
    getOpenCart();
  }, [],)

  // to reset localCheckoutStatus upon the redux state changing
  useEffect(() => {if (!checkoutStatus) localCheckoutStatus = false}, [checkoutStatus],) 

  const clickHandler = async (event) => {
    event.preventDefault();
    // validation against double button clicks
    if (checkoutStatus) return;
    if (localCheckoutStatus) return;
    localCheckoutStatus = true;
    dispatch(setCheckoutStatus(true));
    try {
      const response = await fetch('/api/v1/cart/checkout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      const json = await response.json();
      if (json.message === 'success') {
        dispatch(setOpenCart([]))
        navigate("/cart/confirmation");
      }
      // TODO: write error handling to handle server error of not checking out property perhaps
    } catch(err) {
      dispatch(setCheckoutStatus(false));
      throw(err);
    }
  }

  return (
    <>
      <BackButton />
      <h1>🛒 Shopping Cart 🛒</h1>
      {!openCart?.length ? 
        (
          <h1>No Games in Cart</h1> 
        ) : (
          <>
            <h1>{`TOTAL: $${calcTotal(openCart)}`}</h1>
            <button onClick={clickHandler}>Checkout Your Cart!</button>
            <div>
              {cartQuantityHelper(openCart).map((cartGame) => {
                return <IndCartGameCard key={cartGame.id} {...{cartGame}} />
              })}
            </div>
          </>
        )
      }
      <BackButton />
    </>
  )
}

export default OpenCart