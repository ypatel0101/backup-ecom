import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import store  from "./store/store.js";



ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Provider {...{store}} >
			<App />
		</Provider>
	</BrowserRouter>
);
