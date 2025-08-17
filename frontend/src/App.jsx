import { useEffect } from "react";
import { Loader } from "lucide-react";

import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WriteLetter from "./pages/WriteLetter";
import Letters from "./pages/Letters";

import useAuthStore from "./store/useAuthStore";

function App() {
	const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	console.log({ authUser });

	if (isCheckingAuth && !authUser)
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader className="size-10 animate-spin" />
			</div>
		);

	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={<Landing />}
				/>
				<Route
					path="/write"
					element={authUser ? <WriteLetter /> : <Navigate to="/login" />}
				/>
				<Route
					path="/letters"
					element={<Letters />}
				/>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
			</Routes>
		</div>
	);
}

export default App;
