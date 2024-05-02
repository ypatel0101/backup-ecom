import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Provider } from "react";
import { store } from "react";



ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store ={store}>
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	</Provider>
);
