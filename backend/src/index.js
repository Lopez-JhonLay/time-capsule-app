import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./lib/db.js";

import authRoutes from "./routes/auth.routes.js";
import letterRoutes from "./routes/letter.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "https://time-capsule-app-sable.vercel.app/",
		credentials: true,
	})
);

app.use("/api/auth", authRoutes);
app.use("/api/letters", letterRoutes);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server running on http://localhost:${PORT}`);
});
