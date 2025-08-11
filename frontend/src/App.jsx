import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WriteLetter from "./pages/WriteLetter";
import Letters from "./pages/Letters";

function App() {
	return (
		<div>
			<Routes>
				<Route
					path="/"
					element={<Landing />}
				/>
				<Route
					path="/write"
					element={<WriteLetter />}
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
