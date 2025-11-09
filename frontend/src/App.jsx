import { useEffect } from "react";
import { Loader } from "lucide-react";

import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WriteLetter from "./pages/WriteLetter";
import Letters from "./pages/Letters";

import useAuthStore from "./store/useAuthStore";

import { Toaster } from "react-hot-toast";

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
					element={authUser ? <Navigate to="/letters" /> : <Landing />}
				/>
				<Route
					path="/write"
					element={authUser ? <WriteLetter /> : <Navigate to="/login" />}
				/>
				<Route
					path="/letters"
					element={authUser ? <Letters /> : <Navigate to="/login" />}
				/>
				<Route
					path="/login"
					element={authUser ? <Navigate to="/letters" /> : <Login />}
				/>
				<Route
					path="/register"
					element={authUser ? <Navigate to="/letters" /> : <Register />}
				/>
			</Routes>

			<Toaster />
		</div>
	);
}

export default App;
