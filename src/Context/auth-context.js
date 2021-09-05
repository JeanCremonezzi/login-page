import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const localStorageUserLogged = localStorage.getItem("IS_LOGGED_IN");

		localStorageUserLogged === "YES" ? setIsLoggedIn(true) : setIsLoggedIn(false);
	}, []);

	const logoutHandler = () => {
		localStorage.setItem("IS_LOGGED_IN", "NO");

		setIsLoggedIn(false);
	};

	const loginHandler = () => {
		localStorage.setItem("IS_LOGGED_IN", "YES");

		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
