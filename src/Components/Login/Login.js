import { useState, useReducer, useEffect, useContext } from "react";

import Card from "../Card/Card";
import classes from "./Login.module.css";
import Button from "../Button/Button";
import AuthContext from "../../Context/auth-context";

const emailReducer = (prevState, action) => {
	switch (action.type) {
		case "USER_INPUT":
			return { value: action.val, isValid: action.val.includes("@") };

		case "INPUT_BLUR":
			return { value: prevState.value, isValid: prevState.value.includes("@") };

		default:
			return { value: "", isValid: false };
	}
};

const passwordReducer = (prevState, action) => {
	switch (action.type) {
		case "USER_INPUT":
			return { value: action.val, isValid: action.val.trim().length > 6 };

		case "INPUT_BLUR":
			return {
				value: prevState.value,
				isValid: prevState.value.trim().length > 6,
			};

		default:
			return { value: "", isValid: false };
	}
};

const Login = () => {
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: "",
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: null,
	});

	const context = useContext(AuthContext);

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log("Checking form validity!");
			setFormIsValid(emailState.isValid && passwordState.isValid);
		}, 500);

		return () => {
			console.log("CLEANUP");
			clearTimeout(identifier);
		};
	}, [emailState.isValid, passwordState.isValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: "USER_INPUT", val: event.target.value });
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: "USER_INPUT", val: event.target.value });
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		context.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
