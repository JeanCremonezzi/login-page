import { useState, useEffect } from "react";
import AuthContext from "./Context/auth-context";

import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import MainHeader from "./Components/MainHeader/MainHeader";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const localStorageUserLogged = localStorage.getItem("IS_LOGGED_IN");

		localStorageUserLogged === "YES" ? setIsLoggedIn(true) : setIsLoggedIn(false);
	}, []);

	const loginHandler = (email, password) => {
		localStorage.setItem("IS_LOGGED_IN", "YES");

		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.setItem("IS_LOGGED_IN", "NO");

		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler}}>
			<MainHeader /*onLogout={logoutHandler}*/ />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
		</AuthContext.Provider>
	);
}

export default App;
