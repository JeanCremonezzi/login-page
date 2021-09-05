import { useContext } from "react";

import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import MainHeader from "./Components/MainHeader/MainHeader";
import AuthContext from "./Context/auth-context";

function App() {
	const context = useContext(AuthContext);

	return (
		<>
			<MainHeader />
			<main>
				{!context.isLoggedIn && <Login />}
				{context.isLoggedIn && <Home />}
			</main>
		</>
	);
}

export default App;
